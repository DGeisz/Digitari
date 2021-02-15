import * as React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { ForgotPwdNavProp } from "../../AuthEntryNavTypes";

interface Props {
    navigation: ForgotPwdNavProp;
}

const ForgotPwd: React.FC<Props> = (props) => {
    const [email, setEmail] = React.useState<string>("");
    const [active, setActive] = React.useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={authStyles.paddedAuthContainer}
            onPress={Keyboard.dismiss}
        >
            <View style={basicLayouts.grid5}>
                <Text style={authStyles.authInstructions}>
                    Enter your email and we'll send you a code to reset your
                    password
                </Text>
                <Input
                    placeholder={"Email..."}
                    leftIcon={{
                        type: "MaterialIcons",
                        name: "email",
                        color: palette.lightGray,
                    }}
                    onChangeText={(text) => {
                        setEmail(text);

                        if (email) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
                <AuthButton
                    marginTop={40}
                    onPress={() => {
                        props.navigation.navigate("ResetPwd");
                    }}
                    text={"Submit"}
                    active={active}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default ForgotPwd;
