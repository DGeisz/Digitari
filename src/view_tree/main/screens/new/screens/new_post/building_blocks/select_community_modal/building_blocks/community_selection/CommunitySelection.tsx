import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "./CommunitySelectionStyles";
import { palette } from "../../../../../../../../../../global_styles/Palette";
import { FontAwesome } from "@expo/vector-icons";
import { toRep } from "../../../../../../../../../../global_utils/ValueRepUtils";

interface Props {
    name: string;
    followers?: number;
    onSelect: () => void;
}

export default class CommunitySelection extends React.PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity
                style={styles.selectionContainer}
                activeOpacity={0.5}
                onPress={this.props.onSelect}
            >
                <View style={styles.iconContainer}>
                    <FontAwesome
                        name="users"
                        color={palette.deepBlue}
                        size={23}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.communityName}>{this.props.name}</Text>
                    {this.props.followers !== undefined && (
                        <Text style={styles.followsText}>
                            <Text style={styles.followsNumeral}>
                                {toRep(this.props.followers)}
                            </Text>
                            {this.props.followers === 1
                                ? " Follower"
                                : " Followers"}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}
