import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./AuthButtonStyles";
import { palette } from "../../../../global_styles/Palette";

interface Props {
    text: string;
    active: boolean;
    onPress: () => void;
    marginTop: number;
}

export default class AuthButton extends React.PureComponent<Props> {
    static defaultProps = {
        marginTop: 0,
        active: true,
    };

    render() {
        return (
            <TouchableOpacity
                style={[
                    styles.authButton,
                    {
                        marginTop: this.props.marginTop,
                        backgroundColor: this.props.active
                            ? palette.deepBlue
                            : palette.notDeepBlue,
                    },
                ]}
                onPress={() => this.props.active && this.props.onPress()}
                activeOpacity={this.props.active ? 0.5 : 1}
            >
                <Text style={styles.authButtonText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}
