import * as React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { ResetPwdNavProp } from "../../AuthEntryNavTypes";
import PwdCheck, { checkPwd } from "../../building_blocks/pwd_check/PwdCheck";

interface Props {
    navigation: ResetPwdNavProp;
}

const ResetPwd: React.FC<Props> = (props) => {
    const [password, setPassword] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const [pwdActive, setActive] = React.useState<boolean>(false);
    const [resent, setResent] = React.useState<boolean>(false);

    const [permittedPwd, setPermitted] = React.useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={authStyles.paddedAuthContainer}
            onPress={Keyboard.dismiss}
        >
            <View style={basicLayouts.grid5}>
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
                    onFocus={() => setActive(true)}
                    onChangeText={(pwd) => {
                        setPassword(pwd);
                        setPermitted(checkPwd(pwd));
                    }}
                />
                <PwdCheck active={pwdActive} pwd={password} />
                <Input
                    placeholder={"Verification code..."}
                    keyboardType="number-pad"
                    onChangeText={setCode}
                />
                <TouchableOpacity
                    style={authStyles.authInputFooter}
                    onPress={() => {
                        setResent(true);
                    }}
                    activeOpacity={resent ? 1 : 0.5}
                >
                    <Text
                        style={[
                            authStyles.authInputFooterText,
                            resent ? { color: palette.semiSoftGray } : {},
                        ]}
                    >
                        Resend code
                    </Text>
                </TouchableOpacity>
                <AuthButton
                    marginTop={40}
                    onPress={() => {
                        props.navigation.navigate("ResetPwdSuccess");
                    }}
                    text={"Submit"}
                    active={!!(password && code && permittedPwd)}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default ResetPwd;
