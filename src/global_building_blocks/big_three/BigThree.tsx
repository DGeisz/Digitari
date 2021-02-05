import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "./BigThreeStyles";
import {
    MaterialCommunityIcons,
    FontAwesome,
    Foundation,
} from "@expo/vector-icons";
import { palette } from "../../global_styles/Palette";

const bigFontSize = 16;

/**
 * This is the symbol designating that you've
 * blocked this number of people
 */
interface BlockedProps {
    blocked: string | number;
}

export class Blocked extends React.PureComponent<BlockedProps> {
    render() {
        return (
            <View style={styles.blocked}>
                <MaterialCommunityIcons
                    name="hand-left"
                    color={palette.warning}
                    size={15}
                />
                <Text style={styles.blockedCount}>{this.props.blocked}</Text>
            </View>
        );
    }
}

export class BlockedBig extends React.PureComponent<BlockedProps> {
    render() {
        return (
            <View style={styles.blocked}>
                <MaterialCommunityIcons
                    name="hand-left"
                    color={palette.warning}
                    size={20}
                />
                <Text style={[styles.blockedCount, { fontSize: bigFontSize }]}>
                    {this.props.blocked}
                </Text>
            </View>
        );
    }
}

export class BlockedSymbol extends React.PureComponent {
    render() {
        return (
            <View style={styles.blocked}>
                <MaterialCommunityIcons
                    name="hand-left"
                    color={palette.warning}
                    size={20}
                />
            </View>
        );
    }
}

/**
 * This is the symbol designating that you've been
 * blocked by this number of people
 */
interface BeenBlockedProps {
    beenBlocked: string | number;
}

export class BeenBlocked extends React.PureComponent<BeenBlockedProps> {
    render() {
        return (
            <View style={styles.beenBlocked}>
                <Foundation
                    name="x"
                    color={palette.danger}
                    size={15}
                    style={{ transform: [{ translateY: 1 }] }}
                />
                <Text style={styles.beenBlockedCount}>
                    {this.props.beenBlocked}
                </Text>
            </View>
        );
    }
}

export class BeenBlockedBig extends React.PureComponent<BeenBlockedProps> {
    render() {
        return (
            <View style={styles.beenBlocked}>
                <Foundation
                    name="x"
                    color={palette.danger}
                    size={20}
                    style={{ transform: [{ translateY: 1 }] }}
                />
                <Text
                    style={[styles.beenBlockedCount, { fontSize: bigFontSize }]}
                >
                    {this.props.beenBlocked}
                </Text>
            </View>
        );
    }
}

export class BeenBlockedSymbol extends React.PureComponent {
    render() {
        return (
            <View style={styles.beenBlocked}>
                <Foundation
                    name="x"
                    color={palette.danger}
                    size={20}
                    style={{ transform: [{ translateY: 1 }] }}
                />
            </View>
        );
    }
}

/**
 * Symbol indicating you've had this many successful conversations
 */
interface SuccessfulConversationsProps {
    conversations: string | number;
}

export class SuccessfulConvos extends React.PureComponent<SuccessfulConversationsProps> {
    render() {
        return (
            <View style={styles.successfulConversations}>
                <FontAwesome
                    name="handshake-o"
                    color={palette.primary}
                    size={15}
                />
                <Text style={styles.successCount}>
                    {this.props.conversations}
                </Text>
            </View>
        );
    }
}

export class SuccessfulConversationsBig extends React.PureComponent<SuccessfulConversationsProps> {
    render() {
        return (
            <View style={styles.successfulConversations}>
                <FontAwesome
                    name="handshake-o"
                    color={palette.primary}
                    size={20}
                />
                <Text style={[styles.successCount, { fontSize: bigFontSize }]}>
                    {this.props.conversations}
                </Text>
            </View>
        );
    }
}

export class SuccessfulConversationsSymbol extends React.PureComponent {
    render() {
        return (
            <View style={styles.successfulConversations}>
                <FontAwesome
                    name="handshake-o"
                    color={palette.primary}
                    size={20}
                />
            </View>
        );
    }
}
