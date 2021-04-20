import React, { useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Input } from "react-native-elements";
import { authStyles } from "../../styles/AuthStyles";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { SignInEmailPwdNavProp } from "../../AuthEntryNavTypes";
import { Auth } from "aws-amplify";

interface Props {
    navigation: SignInEmailPwdNavProp;
}

const SignInEmailPwd: React.FC<Props> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loginLoading, setLoginLoading] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [errorActive, setErrorActive] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    const signIn = async () => {
        Keyboard.dismiss();

        if (email && password) {
            setErrorActive(false);
            setLoginLoading(true);
            try {
                await Auth.signIn(email, password);
            } catch (e) {
                if (e.code && e.code === "UserNotConfirmedException") {
                    props.navigation.navigate("VerifyEmail", {
                        email,
                        pwd: password,
                    });
                } else if (e.message) {
                    console.log("Error signing in:", e);
                    setError(e.message);
                    setErrorActive(true);
                } else {
                    setError(
                        "Error signing you in.  Please check your connection and try again"
                    );
                    setErrorActive(true);
                }
                setLoginLoading(false);
            }
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
                    <Text style={authStyles.authErrorText}>{error}</Text>
                )}
                <Input
                    placeholder={"Email..."}
                    leftIcon={{
                        type: "MaterialIcons",
                        name: "email",
                        color: palette.lightGray,
                    }}
                    onFocus={() => setErrorActive(false)}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder={"Password..."}
                    leftIcon={{
                        type: "MaterialIcons",
                        name: "lock",
                        color: palette.lightGray,
                    }}
                    secureTextEntry
                    onFocus={() => setErrorActive(false)}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={authStyles.authInputFooter}
                    onPress={() => props.navigation.navigate("ForgotPwd")}
                >
                    <Text style={authStyles.authInputFooterText}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
                <AuthButton
                    loading={loginLoading}
                    marginTop={40}
                    onPress={signIn}
                    text={"Sign in"}
                    active={!!(email && password)}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default SignInEmailPwd;
