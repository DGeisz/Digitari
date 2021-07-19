import React, { useEffect, useState } from "react";
import { styles } from "./BioModalStyles";
import { Image, Keyboard, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { palette } from "../../../../../global_styles/Palette";
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import { useAuthKeyboardBuffer } from "../../../../../view_tree/auth/building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/client";
import {
    UPDATE_BIO,
    UPDATE_PROFILE_PIC,
    UpdateBioData,
    UpdateBioVariables,
    UpdateProfilePicData,
    UpdateProfilePicVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../global_types/UserTypes";
import { localUid } from "../../../../../global_state/UserState";

interface Props {
    visible: boolean;
    hideModal: () => void;
    bio: string;
    imgUrl?: string;
}

const BioModal: React.FC<Props> = (props) => {
    const uid = localUid();

    const [bio, setBio] = useState<string>(props.bio);
    const [bioChanged, setBioChanged] = useState<boolean>(false);

    const [imgUrl, setImgUrl] = useState<string | undefined>(props.imgUrl);
    const [img, setImg] = useState<File | null>(null);
    const [imgUrlChanged, setImgUrlChanged] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    const [updateBio] = useMutation<UpdateBioData, UpdateBioVariables>(
        UPDATE_BIO,
        {
            update(cache, { data }) {
                if (!!data?.updateBio) {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            bio() {
                                return data.updateBio.bio;
                            },
                        },
                    });
                }
            },
        }
    );

    const [updateProfilePic] = useMutation<
        UpdateProfilePicData,
        UpdateProfilePicVariables
    >(UPDATE_PROFILE_PIC, {
        update(cache, { data }) {
            if (!!data?.updateProfilePic && !!imgUrl) {
                if (!!img) {
                    fetch(data.updateProfilePic.presignedUrl, {
                        method: "PUT",
                        body: img,
                    })
                        .then(() => {
                            if (__DEV__) {
                                console.log("Image upload successful!");
                            }

                            cache.modify({
                                id: cache.identify({
                                    __typename: USER_TYPENAME,
                                    id: uid,
                                }),
                                fields: {
                                    imgUrl() {
                                        return data.updateProfilePic.url;
                                    },
                                },
                            });
                        })
                        .catch((e) => {
                            if (__DEV__) {
                                console.log(
                                    "Image upload failed: " + e.message
                                );
                            }
                        });
                }
            }
        },
    });

    useEffect(() => {
        if (!props.visible) {
            setImgUrl(props.imgUrl);
            setImg(null);
            setBio(props.bio);
            setImgUrlChanged(false);
            setBioChanged(false);
        }
    }, [props.visible]);

    const selectImage = async () => {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status === "granted") {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });

            if (!result.cancelled) {
                const blob = await (await fetch(result.uri)).blob();
                const typeSplit = blob.type.split("/");

                if (typeSplit.length === 2 && typeSplit[0] === "image") {
                    let file = new File([blob], `p.${typeSplit[1]}`);
                    setImgUrlChanged(true);
                    setImgUrl(result.uri);
                    setImg(file);
                }
            }
        }
    };

    const onSubmit = () => {
        if (bioChanged) {
            updateBio({
                variables: {
                    bio,
                },
                optimisticResponse: {
                    updateBio: {
                        bio: bio,
                    },
                },
            }).catch((e) => {
                if (__DEV__) {
                    console.log("Bio error: ", e);
                }
            });
        }

        if (imgUrlChanged && !!imgUrl && !!img) {
            updateProfilePic({
                variables: {
                    imgName: imgUrl,
                },
            }).catch((e) => {
                if (__DEV__) {
                    console.log("img error: ", e);
                }
            });
        }

        props.hideModal();
    };

    return (
        <Modal isVisible={props.visible}>
            <TouchableOpacity
                onPress={props.hideModal}
                activeOpacity={1}
                style={styles.outerContainer}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.imageSelectorContainer}>
                        <Text style={styles.titleText}>Edit profile</Text>
                        {!!imgUrl ? (
                            <Image
                                source={{ uri: imgUrl }}
                                style={styles.profilePic}
                            />
                        ) : (
                            <View style={styles.placeHolderPic}>
                                <FontAwesome
                                    name="user"
                                    color={palette.lightGray}
                                    size={35}
                                />
                            </View>
                        )}
                        <TouchableOpacity onPress={selectImage}>
                            <Text style={styles.selectImageText}>
                                Select Image
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Input
                        placeholder="Bio..."
                        style={styles.bioText}
                        multiline
                        onChangeText={(text) => {
                            setBioChanged(true);
                            setBio(text);
                        }}
                        value={bio}
                    />
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={props.hideModal}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={onSubmit}
                        >
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={{ height: bufferHeight }} />
            </TouchableOpacity>
        </Modal>
    );
};

export default BioModal;
