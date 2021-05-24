import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./AuthButtonStyles";
import { palette } from "../../../../global_styles/Palette";

interface Props {
    text: string;
    active: boolean;
    onPress: () => void;
    loading: boolean;
    marginTop: number;
    height?: number;
}

export default class AuthButton extends React.PureComponent<Props> {
    static defaultProps = {
        marginTop: 0,
        active: true,
        loading: false,
    };

    render() {
        if (this.props.loading) {
            return (
                <ActivityIndicator
                    size="large"
                    color={palette.deepBlue}
                    style={{ marginTop: this.props.marginTop }}
                />
            );
        } else {
            return (
                <View
                    style={[
                        styles.authButtonContainer,
                        { minHeight: this.props.height },
                    ]}
                >
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
                        onPress={() =>
                            this.props.active && this.props.onPress()
                        }
                        activeOpacity={this.props.active ? 0.5 : 1}
                    >
                        <Text style={styles.authButtonText}>
                            {this.props.text}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}
