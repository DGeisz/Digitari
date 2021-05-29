import React, { useState } from "react";
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
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pwdActive, setActive] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [errorActive, setErrorActive] = useState<boolean>(false);

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
                    onChangeText={(text) =>
                        setEmail(text.replace(/\r?\n|\r/g, ""))
                    }
                    value={email}
                />
                <Input
                    keyboardType="twitter"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    spellCheck={false}
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
                    onChangeText={(text) =>
                        setPassword(text.replace(/\r?\n|\r/g, ""))
                    }
                    value={password}
                />
                <PwdCheck active={pwdActive} pwd={password} />
                <Text style={authStyles.signUpConsent}>
                    By signing up, you agree to our{"\n "}
                    <Text
                        style={authStyles.tcLink}
                        onPress={() =>
                            props.navigation.navigate("TermsAndConditions")
                        }
                    >
                        Terms & Conditions
                    </Text>
                </Text>
                <AuthButton
                    marginTop={20}
                    loading={loading}
                    onPress={signUp}
                    text={"Sign up"}
                    active={!!(email && password && checkPwd(password))}
                    height={bufferHeight}
                />
            </View>
        </TouchableOpacity>
    );
};

export default NewAccountEmailPwd;
