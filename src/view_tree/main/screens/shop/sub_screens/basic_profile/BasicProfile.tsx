import React, { useRef, useState } from "react";
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
    MAX_BIO_LENGTH,
    MAX_BIO_LINK_LENGTH,
} from "../../../../../../global_types/UserTypes";

const BasicProfile: React.FC = () => {
    const userBolts = 10;

    const [imgUrl, setImgUrl] = useState<string | undefined>();
    const [img, setImg] = useState<File | undefined>();
    const [imgChanged, setImgUrlChanged] = useState<boolean>(false);

    const [bio, setBio] = useState<string>("");
    const [bioChanged, setBioChanged] = useState<boolean>(false);

    const [bioLink, setBioLink] = useState<string>("");
    const [linkChanged, setLinkChanged] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();
    const scrollRef = useRef<ScrollView>(null);

    const [picHeight, setPicHeight] = useState<number>(0);

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

    return (
        <ScrollView ref={scrollRef} style={styles.container}>
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
                        <Text style={styles.selectImageText}>Select Image</Text>
                    </TouchableOpacity>
                </View>
                <LockBuySelect
                    active={imgChanged}
                    userBolts={userBolts}
                    description={"set your profile picture"}
                    purchaseTitle={"Set Pic"}
                    itemTitle={"pic"}
                    price={50}
                    alreadyOwns={false}
                    onSelect={() => {}}
                    onConfirm={() => {}}
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
                                scrollRef.current.scrollTo({ y: picHeight }),
                            20
                        )
                    }
                />
                <Text style={styles.remainingCharacters}>
                    {MAX_BIO_LENGTH - bio.length}
                </Text>
                <LockBuySelect
                    userBolts={userBolts}
                    active={bioChanged}
                    description={"set your bio"}
                    purchaseTitle={"Set Bio"}
                    itemTitle={"bio"}
                    price={50}
                    alreadyOwns={false}
                    onSelect={() => {}}
                    onConfirm={() => {}}
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
                    userBolts={userBolts}
                    active={linkChanged}
                    description={"set your bio link"}
                    purchaseTitle={"Set Link"}
                    itemTitle="link"
                    price={50}
                    alreadyOwns={false}
                    onSelect={() => {}}
                    onConfirm={() => {}}
                />
            </View>
            <View style={{ height: !!bufferHeight ? bufferHeight : 40 }} />
        </ScrollView>
    );
};

export default BasicProfile;
