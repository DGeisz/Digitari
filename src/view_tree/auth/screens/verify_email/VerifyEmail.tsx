import React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { Auth } from "aws-amplify";
import { VerifyEmailRouteProp } from "../../AuthEntryNavTypes";
import { palette } from "../../../../global_styles/Palette";

interface Props {
    route: VerifyEmailRouteProp;
}

const VerifyEmail: React.FC<Props> = (props) => {
    const [code, setCode] = useState<string>("");
    const [resent, setResent] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [errorActive, setErrorActive] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    const submit = async () => {
        Keyboard.dismiss();

        if (code) {
            setLoading(true);

            try {
                await Auth.confirmSignUp(
                    props.route.params.email,
                    code.toString()
                );

                try {
                    await new Promise((resolve) => setTimeout(resolve, 2000));

                    await Auth.signIn(
                        props.route.params.email,
                        props.route.params.pwd
                    );
                } finally {
                    setError("");
                }
            } catch (e) {
                const message = e.message
                    ? e.message
                    : "An error occurred, please try again.";
                setError(message);
                setErrorActive(true);
            }

            setLoading(false);
        }
    };

    const resendCode = async () => {
        if (!resent) {
            setResent(true);

            try {
                await Auth.resendSignUp(props.route.params.email);
            } catch (e) {
                if (e.message) {
                    setError(e.message);
                    setErrorActive(true);
                    setResent(false);
                }
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
                <Text style={authStyles.authInstructions}>
                    Enter the code we emailed you
                </Text>
                <Input
                    placeholder={"Verification code..."}
                    keyboardType="number-pad"
                    onChangeText={setCode}
                    onFocus={() => setErrorActive(false)}
                />
                <TouchableOpacity
                    style={authStyles.authInputFooter}
                    onPress={resendCode}
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
                    loading={loading}
                    onPress={submit}
                    text={"Submit"}
                    active={!!code}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default VerifyEmail;
