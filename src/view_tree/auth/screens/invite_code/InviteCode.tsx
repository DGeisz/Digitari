import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { InviteCodeNavProp } from "../../AuthEntryNavTypes";
import { authStyles } from "../../styles/AuthStyles";
import { Input } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { styles } from "./InviteCodeStyles";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import {
    VALIDATE_INVITE_CODE,
    ValidateInviteCodeData,
    ValidateInviteCodeVariables,
} from "./gql/Queries";
import { inviteCode, setInviteCode } from "../../../../global_state/AuthState";

interface Props {
    navigation: InviteCodeNavProp;
}

const InviteCode: React.FC<Props> = (props) => {
    const [code, setCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const bufferHeight = useAuthKeyboardBuffer();

    const client = useApolloClient();

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={authStyles.paddedAuthContainer}
            onPress={Keyboard.dismiss}
        >
            <View style={basicLayouts.grid5}>
                <Text style={styles.inviteText}>
                    Right now, you have to be invited to join Digitari. {"\n\n"}
                    If you have a invite code, use it here, otherwise ask your
                    friends on Digitari to send you an invite!
                </Text>
                {!!error && (
                    <Text style={authStyles.authErrorText}>{error}</Text>
                )}
                <Input
                    keyboardType="twitter"
                    autoCapitalize={"characters"}
                    autoCorrect={false}
                    spellCheck={false}
                    placeholder={"Invite code..."}
                    leftIcon={{
                        type: "MaterialIcons",
                        name: "lock",
                        color: palette.lightGray,
                    }}
                    onChangeText={(text) =>
                        setCode(text.replace(/\r?\n|\r/g, ""))
                    }
                    value={code}
                />
                <AuthButton
                    marginTop={20}
                    onPress={async () => {
                        setLoading(true);

                        if (code.length >= 7) {
                            try {
                                const { data } = await client.query<
                                    ValidateInviteCodeData,
                                    ValidateInviteCodeVariables
                                >({
                                    query: VALIDATE_INVITE_CODE,
                                    variables: {
                                        code,
                                    },
                                });

                                if (data.validInviteCode) {
                                    setError("");
                                    setInviteCode(code);

                                    setLoading(false);

                                    props.navigation.pop();
                                    props.navigation.navigate("NewAccountName");
                                } else {
                                    setError(
                                        "Looks like that isn't a valid code.  Make sure it's correct and try again."
                                    );

                                    setLoading(false);
                                }
                            } catch (e) {
                                setError(
                                    "Hmm, looks like the internet broke.  Give us a sec and try again."
                                );

                                setLoading(false);
                            }
                        }
                    }}
                    active={code.length >= 7}
                    loading={loading}
                    text={"Submit"}
                    height={bufferHeight}
                />
            </View>
        </TouchableOpacity>
    );
};

export default InviteCode;
