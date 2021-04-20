import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SocialIcon } from "react-native-elements";
import { palette } from "../../../../global_styles/Palette";
import { styles } from "./SocialAuthStyles";

interface Props {
    actionCommand: string;
    facebookAction: () => void;
    googleAction: () => void;
    appleAction: () => void;
    emailAction: () => void;
}

export default class SocialAuth extends React.PureComponent<Props> {
    static defaultProps = {
        actionCommand: "Sign in",
    };

    render() {
        return (
            <View style={styles.socialAuthContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.props.facebookAction}
                >
                    <SocialIcon
                        type="facebook"
                        style={{ paddingHorizontal: 20 }}
                        fontStyle={{ fontSize: 18 }}
                        title={`${this.props.actionCommand} with Facebook`}
                        button
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.googleContainer}
                    activeOpacity={0.5}
                    onPress={this.props.googleAction}
                >
                    <View style={styles.googleIconContainer}>
                        <Image
                            source={require("../../../../../assets/g-logo.png")}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                        />
                    </View>
                    <Text style={styles.socialIconTitle}>
                        {`${this.props.actionCommand} with Google`}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.props.appleAction}
                >
                    <SocialIcon
                        // @ts-ignore
                        type="apple"
                        style={{
                            paddingHorizontal: 20,
                            backgroundColor: palette.black,
                        }}
                        fontStyle={{ fontSize: 18 }}
                        title={`${this.props.actionCommand} with Apple`}
                        button
                    />
                </TouchableOpacity>
                <View style={styles.orContainer}>
                    <View style={styles.orBar} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.orBar} />
                </View>
                <TouchableOpacity
                    style={styles.emailContainer}
                    activeOpacity={0.5}
                    onPress={this.props.emailAction}
                >
                    <Text style={styles.socialIconTitle}>
                        {`${this.props.actionCommand} with email`}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
