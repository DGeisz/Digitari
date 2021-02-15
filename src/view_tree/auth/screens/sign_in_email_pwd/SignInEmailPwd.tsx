import * as React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { authStyles } from "../../styles/AuthStyles";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { SignInEmailPwdNavProp } from "../../AuthEntryNavTypes";
import PwdCheck, { checkPwd } from "../../building_blocks/pwd_check/PwdCheck";

interface Props {
    navigation: SignInEmailPwdNavProp;
}

const SignInEmailPwd: React.FC<Props> = (props) => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const bufferHeight = useAuthKeyboardBuffer();

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={authStyles.paddedAuthContainer}
            onPress={Keyboard.dismiss}
        >
            <View style={basicLayouts.grid5}>
                <Input
                    placeholder={"Email..."}
                    leftIcon={{
                        type: "MaterialIcons",
                        name: "email",
                        color: palette.lightGray,
                    }}
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
                    marginTop={40}
                    onPress={() => {}}
                    text={"Sign in"}
                    active={!!(email && password)}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default SignInEmailPwd;
