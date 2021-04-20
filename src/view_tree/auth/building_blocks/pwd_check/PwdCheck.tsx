import React from "react";
import { View, Text } from "react-native";
import { styles } from "./PwdCheckStyles";
import { palette } from "../../../../global_styles/Palette";

interface Props {
    active: boolean;
    pwd: string;
}

export default class PwdCheck extends React.PureComponent<Props> {
    render() {
        if (this.props.active) {
            const hasLowerCase =
                this.props.pwd !== this.props.pwd.toUpperCase();
            const hasUpperCase =
                this.props.pwd !== this.props.pwd.toLowerCase();
            const containsNumber = /\d/.test(this.props.pwd);
            const atLeast8Chars = this.props.pwd.length >= 8;

            return (
                <View style={styles.pwdCheckContainer}>
                    <Text
                        style={[
                            styles.pwdCheckText,
                            {
                                color: hasLowerCase
                                    ? palette.quasiLightForestGreen
                                    : palette.danger,
                            },
                        ]}
                    >
                        Password must contain a lower case letter
                    </Text>
                    <Text
                        style={[
                            styles.pwdCheckText,
                            {
                                color: hasUpperCase
                                    ? palette.quasiLightForestGreen
                                    : palette.danger,
                            },
                        ]}
                    >
                        Password must contain an upper case letter
                    </Text>
                    <Text
                        style={[
                            styles.pwdCheckText,
                            {
                                color: containsNumber
                                    ? palette.quasiLightForestGreen
                                    : palette.danger,
                            },
                        ]}
                    >
                        Password must contain a number
                    </Text>
                    <Text
                        style={[
                            styles.pwdCheckText,
                            {
                                color: atLeast8Chars
                                    ? palette.quasiLightForestGreen
                                    : palette.danger,
                            },
                        ]}
                    >
                        Password must contain at least 8 characters
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    }
}

export function checkPwd(pwd: string): boolean {
    const hasLowerCase = pwd !== pwd.toUpperCase();
    const hasUpperCase = pwd !== pwd.toLowerCase();
    const containsNumber = /\d/.test(pwd);
    const atLeast8Chars = pwd.length >= 8;

    return atLeast8Chars && containsNumber && hasUpperCase && hasLowerCase;
}
