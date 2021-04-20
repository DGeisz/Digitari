import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CommunityHeaderStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import {
    CommunityType,
    FOLLOW_COMMUNITY_PRICE,
} from "../../../../../../global_types/CommunityTypes";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";
import { dateFormatter } from "../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";

interface Props {
    community: CommunityType;
    handleFollow: () => void;
    handleUnFollow: () => void;
}

const CommunityHeader: React.FC<Props> = (props) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <View style={styles.headerContainer}>
            {showError && (
                <Text style={styles.followErrorText}>
                    {`You need ${FOLLOW_COMMUNITY_PRICE} digicoin to follow this community`}
                </Text>
            )}
            <View style={styles.headerHeader}>
                <View style={styles.headerLeft}>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name="users"
                            size={26}
                            color={palette.deepBlue}
                        />
                    </View>
                </View>
                <View style={styles.headerRight}>
                    {loading ? (
                        <ActivityIndicator
                            color={palette.deepBlue}
                            size="small"
                        />
                    ) : props.community.amFollowing ? (
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={() => {
                                props.handleUnFollow();
                                setShowError(false);
                            }}
                        >
                            <Text style={styles.followButtonText}>
                                Unfollow
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={async () => {
                                setLoading(true);
                                try {
                                    await props.handleFollow();
                                } catch (_) {
                                    setShowError(true);
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >
                            <View style={styles.followButtonTextContainer}>
                                <Text style={styles.followButtonText}>
                                    Follow
                                </Text>
                            </View>
                            <CoinBox
                                amount={FOLLOW_COMMUNITY_PRICE}
                                fontSize={15}
                                coinSize={23}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Text style={styles.nameText}>{props.community.name}</Text>
            <View style={styles.headerBody}>
                <Text style={styles.descriptionText}>
                    {props.community.description}
                </Text>
            </View>
            <View style={styles.headerFooter}>
                <View style={styles.footerLeft}>
                    <Text style={styles.followsText}>
                        <Text style={styles.followsCountText}>
                            {toRep(props.community.followers)}
                            <Text style={styles.followsText}>
                                {" Followers"}
                            </Text>
                        </Text>
                    </Text>
                </View>
                <View style={styles.footerRight}>
                    <Text style={styles.dateText}>
                        {`Created: ${dateFormatter(
                            props.community.timeCreated
                        )}`}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CommunityHeader;
