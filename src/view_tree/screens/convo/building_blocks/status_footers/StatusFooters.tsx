import * as React from "react";
import { styles } from "./StatusFooterStyles";
import { Text, TouchableOpacity, View } from "react-native";

export class DismissedFooter extends React.PureComponent {
    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.dismissedContainer}>
                    <Text style={styles.dismissedText}>Response dismissed</Text>
                </View>
            </View>
        );
    }
}

export class BlockedFooter extends React.PureComponent {
    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.blockedContainer}>
                    <Text style={styles.blockedText}>Convo Blocked</Text>
                </View>
            </View>
        );
    }
}

export class SuccessFooter extends React.PureComponent {
    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.successContainer}>
                    <Text style={styles.successText}>Successful Convo</Text>
                </View>
            </View>
        );
    }
}

interface PendingProps {
    onPress: () => void;
}

export class PendingFinishFooter extends React.PureComponent<PendingProps> {
    render() {
        return (
            <View style={styles.statusContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.pendingContainer}
                >
                    <Text style={styles.pendingText}>Finish Convo</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
