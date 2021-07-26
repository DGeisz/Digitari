import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { ForgotPwdNavProp } from "../../AuthEntryNavTypes";
import { Auth } from "aws-amplify";

interface Props {
    navigation: ForgotPwdNavProp;
}

const ForgotPwd: React.FC<Props> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [errorActive, setErrorActive] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    const sendEmail = async () => {
        if (email) {
            setLoading(true);
            try {
                await Auth.forgotPassword(email);
                props.navigation.popToTop();
                props.navigation.navigate("ResetPwd", { email });
            } catch (e) {
                if (__DEV__) {
                    console.log("Reset error: ", e);
                }

                setErrorActive(true);
            }
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={authStyles.paddedAuthContainer}
            onPress={Keyboard.dismiss}
        >
            <View style={basicLayouts.grid5}>
                {errorActive && (
                    <Text style={authStyles.authErrorText}>
                        An error occurred. Check your email address and network
                        connection and try again
                    </Text>
                )}
                <Text style={authStyles.authInstructions}>
                    Enter your email and we'll send you a code to reset your
                    password
                </Text>
                <Input
                    keyboardType="twitter"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    spellCheck={false}
                    placeholder={"Email..."}
                    leftIcon={{
                        type: "MaterialIcons",
                        name: "email",
                        color: palette.lightGray,
                    }}
                    onFocus={() => setErrorActive(false)}
                    onChangeText={(text) => {
                        setEmail(text.replace(/\r?\n|\r/g, ""));

                        if (email) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
                <AuthButton
                    marginTop={40}
                    loading={loading}
                    onPress={sendEmail}
                    text={"Submit"}
                    active={active}
                    height={bufferHeight}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ForgotPwd;
