import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { ResetPwdNavProp, ResetPwdRouteProp } from "../../AuthEntryNavTypes";
import PwdCheck, { checkPwd } from "../../building_blocks/pwd_check/PwdCheck";
import { Auth } from "aws-amplify";

interface Props {
    navigation: ResetPwdNavProp;
    route: ResetPwdRouteProp;
}

const ResetPwd: React.FC<Props> = (props) => {
    const [password, setPassword] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [pwdActive, setActive] = useState<boolean>(false);
    const [resent, setResent] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [errorActive, setErrorActive] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    const submitReset = async () => {
        if (checkPwd(password) && code) {
            setLoading(true);
            try {
                await Auth.forgotPasswordSubmit(
                    props.route.params.email,
                    code,
                    password
                );
                props.navigation.navigate("ResetPwdSuccess");
                setErrorActive(false);
            } catch (e) {
                setErrorActive(true);
                setError(
                    e.message
                        ? e.message
                        : "An error occurred, please try again"
                );
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
                    <Text style={authStyles.authErrorText}>{error}</Text>
                )}
                <Text style={authStyles.authInstructions}>
                    Enter your new password and the code we emailed you
                </Text>
                <Input
                    placeholder={"New password..."}
                    leftIcon={{
                        type: "MaterialIcons",
                        name: "lock",
                        color: palette.lightGray,
                    }}
                    secureTextEntry
                    onBlur={() => setActive(false)}
                    onFocus={() => {
                        setActive(true);
                        setErrorActive(false);
                    }}
                    onChangeText={setPassword}
                />
                <PwdCheck active={pwdActive} pwd={password} />
                <Input
                    placeholder={"Verification code..."}
                    keyboardType="number-pad"
                    onChangeText={setCode}
                    onFocus={() => setErrorActive(false)}
                />
                <AuthButton
                    marginTop={40}
                    loading={loading}
                    onPress={submitReset}
                    text={"Submit"}
                    active={!!(password && code && checkPwd(password))}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default ResetPwd;
