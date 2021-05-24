import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { NewAccountNameNavProp } from "../../AuthEntryNavTypes";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";

interface Props {
    navigation: NewAccountNameNavProp;
}

const NewAccountName: React.FC<Props> = (props) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={authStyles.paddedAuthContainer}
            onPress={Keyboard.dismiss}
        >
            <View style={basicLayouts.grid5}>
                <Input
                    autoFocus
                    keyboardType="twitter"
                    autoCorrect={false}
                    spellCheck={false}
                    placeholder={"First name..."}
                    onChangeText={(text) => {
                        setFirstName(text.replace(/\r?\n|\r/g, ""));

                        if (firstName && lastName) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
                <Input
                    keyboardType="twitter"
                    autoCorrect={false}
                    spellCheck={false}
                    placeholder={"Last name..."}
                    onChangeText={(text) => {
                        setLastName(text.replace(/\r?\n|\r/g, ""));

                        if (firstName && lastName) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
                <Text style={authStyles.subText}>
                    We use real names on Digitari 😊
                </Text>
                <AuthButton
                    marginTop={20}
                    onPress={() => {
                        props.navigation.navigate("NewAccountEmailPwd", {
                            firstName,
                            lastName,
                        });
                    }}
                    text={"Next"}
                    active={active}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default NewAccountName;
