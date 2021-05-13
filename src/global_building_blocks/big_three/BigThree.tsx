import React from "react";
import { View, Text } from "react-native";
import { styles } from "./BigThreeStyles";
import {
    MaterialCommunityIcons,
    FontAwesome,
    Foundation,
} from "@expo/vector-icons";
import { palette } from "../../global_styles/Palette";
import { toCommaRep, toRep } from "../../global_utils/ValueRepUtils";

const bigFontSize = 16;

/**
 * This is the symbol designating that you've
 * blocked this number of people
 */
interface BlockedProps {
    blocked: number;
    showAbbreviated: boolean;
}

export class Blocked extends React.PureComponent<BlockedProps> {
    static defaultProps = {
        showAbbreviated: true,
    };

    render() {
        return (
            <View style={styles.blocked}>
                <MaterialCommunityIcons
                    name="hand-left"
                    color={palette.warning}
                    size={15}
                />
                <Text style={styles.blockedCount}>
                    {this.props.showAbbreviated
                        ? toRep(this.props.blocked)
                        : toCommaRep(this.props.blocked)}
                </Text>
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

interface SymProps {
    size: number;
}

export class BlockedSymbol extends React.PureComponent<SymProps> {
    render() {
        return (
            <View style={styles.blocked}>
                <MaterialCommunityIcons
                    name="hand-left"
                    color={palette.warning}
                    size={this.props.size}
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
    beenBlocked: number;
    showAbbreviated: boolean;
}

export class BeenBlocked extends React.PureComponent<BeenBlockedProps> {
    static defaultProps = {
        showAbbreviated: true,
    };

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
                    {this.props.showAbbreviated
                        ? toRep(this.props.beenBlocked)
                        : toCommaRep(this.props.beenBlocked)}
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

export class BeenBlockedSymbol extends React.PureComponent<SymProps> {
    render() {
        return (
            <View style={styles.beenBlocked}>
                <Foundation
                    name="x"
                    color={palette.danger}
                    size={this.props.size}
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
    conversations: number;
    showAbbreviated: boolean;
}

export class SuccessfulConvos extends React.PureComponent<SuccessfulConversationsProps> {
    static defaultProps = {
        showAbbreviated: true,
    };

    render() {
        return (
            <View style={styles.successfulConversations}>
                <FontAwesome
                    name="handshake-o"
                    color={palette.primary}
                    size={15}
                />
                <Text style={styles.successCount}>
                    {this.props.showAbbreviated
                        ? toRep(this.props.conversations)
                        : toCommaRep(this.props.conversations)}
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

export class SuccessfulConversationsSymbol extends React.PureComponent<SymProps> {
    render() {
        return (
            <View style={styles.successfulConversations}>
                <FontAwesome
                    name="handshake-o"
                    color={palette.primary}
                    size={this.props.size}
                />
            </View>
        );
    }
}
