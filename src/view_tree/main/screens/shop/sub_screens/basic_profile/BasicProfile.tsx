import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./BasicProfileStyles";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import LockBuySelect from "../../building_blocks/lock_buy_select/LockBuySelect";
import { useAuthKeyboardBuffer } from "../../../../../auth/building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import {
    CHANGE_BIO_PRICE,
    CHANGE_LINK_PRICE,
    CHANGE_PROFILE_PIC_PRICE,
    MAX_BIO_LENGTH,
    MAX_BIO_LINK_LENGTH,
    USER_TYPENAME,
    UserType,
} from "../../../../../../global_types/UserTypes";
import { shopStyles } from "../../styles/ShopStyles";
import { localUid } from "../../../../../../global_state/UserState";
import { useMutation, useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import {
    UPDATE_BIO,
    UPDATE_BIO_LINK,
    UPDATE_PROFILE_PIC,
    UpdateBioData,
    UpdateBioLinkData,
    UpdateBioLinkVariables,
    UpdateBioVariables,
    UpdateProfilePicData,
    UpdateProfilePicVariables,
} from "./gql/Mutations";

interface Props {
    user: UserType;
}

const BasicProfile: React.FC<Props> = (props) => {
    const uid = localUid();

    /*
     * First initialize all the state
     */
    const [imgUrl, setImgUrl] = useState<string | undefined>();
    const [img, setImg] = useState<File | undefined>();
    const [imgChanged, setImgUrlChanged] = useState<boolean>(false);
    const [imgLoading, setImgLoading] = useState<boolean>(false);

    const [bio, setBio] = useState<string>("");
    const [bioChanged, setBioChanged] = useState<boolean>(false);
    const [bioLoading, setBioLoading] = useState<boolean>(false);

    const [bioLink, setBioLink] = useState<string>("");
    const [linkChanged, setLinkChanged] = useState<boolean>(false);
    const [linkLoading, setLinkLoading] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();
    const scrollRef = useRef<ScrollView>(null);

    const [picHeight, setPicHeight] = useState<number>(0);

    /*
     * Fetch user
     */
    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    /*
     * Initialize values for different fields
     * when we fetch the user
     */
    useEffect(() => {
        if (!!data?.user) {
            if (!!data.user.imgUrl) {
                setImgUrl(data.user.imgUrl);
            }

            if (!!data.user.bio) {
                setBio(data.user.bio);
            }

            if (!!data.user.link) {
                setBioLink(data.user.link);
            }
        }
    }, [
        !!data?.user ? data.user.imgUrl : "",
        !!data?.user ? data.user.bio : "",
        !!data?.user ? data.user.link : "",
    ]);

    /*
     * Initialize mutations
     */
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
                            bolts(existing) {
                                return existing - CHANGE_BIO_PRICE;
                            },
                        },
                    });
                }
            },
        }
    );

    const [updateBioLink] = useMutation<
        UpdateBioLinkData,
        UpdateBioLinkVariables
    >(UPDATE_BIO_LINK, {
        update(cache, { data }) {
            if (!!data?.updateBioLink) {
                console.log("This is bio link: ", data.updateBioLink.link);
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        link() {
                            return data.updateBioLink.link;
                        },
                        bolts(existing) {
                            return existing - CHANGE_LINK_PRICE;
                        },
                    },
                });
            }
        },
    });

    const [updateProfilePic] = useMutation<
        UpdateProfilePicData,
        UpdateProfilePicVariables
    >(UPDATE_PROFILE_PIC, {
        async update(cache, { data }) {
            if (!!data?.updateProfilePic && !!imgUrl) {
                if (!!img) {
                    /*
                     * Try 5 times to set the image
                     */
                    for (let i = 0; i < 5; i++) {
                        try {
                            await fetch(data.updateProfilePic.presignedUrl, {
                                method: "PUT",
                                body: img,
                            });

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
                                    bolts(existing) {
                                        return (
                                            existing - CHANGE_PROFILE_PIC_PRICE
                                        );
                                    },
                                },
                            });

                            /*
                             * Break out of retry loop
                             */
                            break;
                        } catch (e) {
                            if (__DEV__) {
                                console.error(
                                    "Image upload failed: " + e.message
                                );
                            }
                        }
                    }
                }
            }
        },
    });

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

    if (!data?.user || loading) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <ScrollView ref={scrollRef} style={shopStyles.outerContainer}>
            <View style={shopStyles.container}>
                <View
                    style={styles.basicEntryContainer}
                    onLayout={(e) => setPicHeight(e.nativeEvent.layout.height)}
                >
                    <Text style={styles.entryTitleText}>Profile Pic</Text>
                    <View style={styles.imageSelectorContainer}>
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
                    <LockBuySelect
                        active={imgChanged}
                        loading={imgLoading}
                        userBolts={data.user.bolts}
                        description={"set your profile picture"}
                        purchaseTitle={"Set Pic"}
                        itemTitle={"pic"}
                        price={CHANGE_PROFILE_PIC_PRICE}
                        alreadyOwns={false}
                        onConfirm={async () => {
                            if (imgChanged && !!imgUrl && !!img) {
                                setImgLoading(true);

                                try {
                                    await updateProfilePic({
                                        variables: {
                                            imgName: imgUrl,
                                        },
                                    });
                                } catch (e) {
                                    if (__DEV__) {
                                        console.log("Change img error", e);
                                    }
                                }

                                setImgLoading(false);
                                setImgUrlChanged(false);
                            }
                        }}
                        onSelect={() => {}}
                    />
                </View>
                <View style={styles.basicEntryContainer}>
                    <Text style={styles.entryTitleText}>Bio</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Bio..."
                        multiline
                        value={bio}
                        onChangeText={(text) => {
                            setBio(text.substring(0, MAX_BIO_LENGTH));
                            !bioChanged && setBioChanged(true);
                        }}
                        onFocus={() =>
                            setTimeout(
                                () =>
                                    !!scrollRef.current &&
                                    scrollRef.current.scrollTo({
                                        y: picHeight,
                                    }),
                                20
                            )
                        }
                    />
                    <Text style={styles.remainingCharacters}>
                        {MAX_BIO_LENGTH - bio.length}
                    </Text>
                    <LockBuySelect
                        userBolts={data.user.bolts}
                        active={bioChanged}
                        description={"set your bio"}
                        purchaseTitle={"Set Bio"}
                        itemTitle={"bio"}
                        price={CHANGE_BIO_PRICE}
                        alreadyOwns={false}
                        onSelect={() => {}}
                        onConfirm={async () => {
                            if (bioChanged) {
                                setBioLoading(true);

                                try {
                                    await updateBio({
                                        variables: {
                                            bio,
                                        },
                                        optimisticResponse: {
                                            updateBio: {
                                                bio,
                                            },
                                        },
                                    });
                                } catch (e) {
                                    if (__DEV__) {
                                        console.log("Change bio error", e);
                                    }
                                }

                                setBioLoading(false);
                                setBioChanged(false);
                            }
                        }}
                    />
                </View>
                <View style={styles.basicEntryContainer}>
                    <Text style={styles.entryTitleText}>Bio link</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Paste link..."
                        value={bioLink}
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        onChangeText={(text) => {
                            setBioLink(text.substring(0, MAX_BIO_LINK_LENGTH));
                            !linkChanged && setLinkChanged(true);
                        }}
                        onFocus={() =>
                            setTimeout(
                                () =>
                                    !!scrollRef.current &&
                                    scrollRef.current.scrollToEnd(),
                                100
                            )
                        }
                    />
                    <LockBuySelect
                        userBolts={data.user.bolts}
                        active={linkChanged}
                        loading={linkLoading}
                        description={"set your bio link"}
                        purchaseTitle={"Set Link"}
                        itemTitle="link"
                        price={CHANGE_LINK_PRICE}
                        alreadyOwns={false}
                        onSelect={() => {}}
                        onConfirm={async () => {
                            if (linkChanged) {
                                setLinkLoading(true);

                                try {
                                    await updateBioLink({
                                        variables: {
                                            link: bioLink,
                                        },
                                        optimisticResponse: {
                                            updateBioLink: {
                                                link: bioLink,
                                            },
                                        },
                                    });
                                } catch (e) {
                                    if (__DEV__) {
                                        console.log("Change link error", e);
                                    }
                                }

                                setLinkLoading(false);
                                setLinkChanged(false);
                            }
                        }}
                    />
                </View>
                <View style={{ height: !!bufferHeight ? bufferHeight : 40 }} />
            </View>
        </ScrollView>
    );
};

export default BasicProfile;
