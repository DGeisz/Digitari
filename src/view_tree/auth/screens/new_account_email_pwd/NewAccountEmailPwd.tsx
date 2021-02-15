import * as React from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import PwdCheck, { checkPwd } from "../../building_blocks/pwd_check/PwdCheck";

interface Props {}

const NewAccountEmailPwd: React.FC<Props> = () => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [pwdActive, setActive] = React.useState<boolean>(false);

    const [permittedPwd, setPermitted] = React.useState<boolean>(false);

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
                    onBlur={() => setActive(false)}
                    onFocus={() => setActive(true)}
                    onChangeText={(pwd) => {
                        setPassword(pwd);
                        setPermitted(checkPwd(pwd));
                    }}
                />
                <PwdCheck active={pwdActive} pwd={password} />
                <AuthButton
                    marginTop={20}
                    onPress={() => {}}
                    text={"Sign up"}
                    active={!!(email && password && permittedPwd)}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default NewAccountEmailPwd;
