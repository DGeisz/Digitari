import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { styles } from "./SearchResultStyles";
import {
    SearchEntityEnum,
    SearchEntityType,
} from "../../../../../../../../global_types/SearchEntity";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../../../global_styles/Palette";
import { toRep } from "../../../../../../../../global_utils/ValueRepUtils";

interface Props {
    result: SearchEntityType;
    onSelect: (id: string) => void;
}

export default class SearchResult extends React.PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity
                style={styles.resultContainer}
                activeOpacity={0.5}
                onPress={() => this.props.onSelect(this.props.result.id)}
            >
                <View style={styles.resultLeft}>
                    {this.props.result.entityType === SearchEntityEnum.user ? (
                        !!this.props.result.imgUrl ? (
                            <Image
                                style={styles.userImageContainer}
                                source={{
                                    uri: this.props.result.imgUrl,
                                }}
                            />
                        ) : (
                            <View style={styles.userIconContainer}>
                                <FontAwesome
                                    name="user"
                                    color={palette.white}
                                    size={23}
                                />
                            </View>
                        )
                    ) : (
                        <View style={styles.communityIconContainer}>
                            <FontAwesome
                                name="users"
                                color={palette.deepBlue}
                                size={23}
                            />
                        </View>
                    )}
                    <View style={styles.resultInfoContainer}>
                        <Text style={styles.resultNameText}>
                            {this.props.result.name}
                        </Text>
                        <Text style={styles.followsText}>
                            <Text style={styles.followsNumeral}>
                                {toRep(this.props.result.followers)}
                            </Text>
                            {this.props.result.followers === 1
                                ? " Follower"
                                : " Followers"}
                        </Text>
                    </View>
                </View>
                <View style={styles.resultRight}>
                    <FontAwesome
                        name="chevron-right"
                        color={palette.lightGray}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}
