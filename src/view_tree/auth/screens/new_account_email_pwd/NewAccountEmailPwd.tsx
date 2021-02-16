import * as React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import PwdCheck, { checkPwd } from "../../building_blocks/pwd_check/PwdCheck";
import { Auth } from "aws-amplify";
import {
    NewAccountEmailPwdNavProp,
    NewAccountEmailPwdRouteProp,
} from "../../AuthEntryNavTypes";

interface Props {
    route: NewAccountEmailPwdRouteProp;
    navigation: NewAccountEmailPwdNavProp;
}

const NewAccountEmailPwd: React.FC<Props> = (props) => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [pwdActive, setActive] = React.useState<boolean>(false);

    const [loading, setLoading] = React.useState<boolean>(false);

    const [error, setError] = React.useState<string>("");
    const [errorActive, setErrorActive] = React.useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    const signUp = async () => {
        Keyboard.dismiss();

        if (checkPwd(password) && email) {
            setLoading(true);
            try {
                await Auth.signUp({
                    username: email,
                    password,
                    attributes: {
                        given_name: props.route.params.firstName,
                        family_name: props.route.params.lastName,
                    },
                });
                setErrorActive(false);
                props.navigation.navigate("VerifyEmail", {
                    email,
                    pwd: password,
                });
            } catch (e) {
                setErrorActive(true);

                const message = e.message
                    ? e.message === "Username should be an email."
                        ? "Please use a valid email"
                        : e.message
                    : "An error occurred, please check your connection and try again";

                setError(message);
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
                    onBlur={() => {
                        setActive(false);
                    }}
                    onFocus={() => {
                        setActive(true);
                        setErrorActive(false);
                    }}
                    onChangeText={setPassword}
                />
                <PwdCheck active={pwdActive} pwd={password} />
                <AuthButton
                    marginTop={20}
                    loading={loading}
                    onPress={signUp}
                    text={"Sign up"}
                    active={!!(email && password && checkPwd(password))}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default NewAccountEmailPwd;