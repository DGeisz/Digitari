import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CommunityHeaderStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import {
    COMMUNITY_TYPENAME,
    CommunityType,
    FOLLOW_COMMUNITY_PRICE,
} from "../../../../../../global_types/CommunityTypes";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";
import { dateFormatter } from "../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { useMutation } from "@apollo/client";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import {
    FOLLOW_COMMUNITY,
    FollowCommunityData,
    FollowCommunityVariables,
    UN_FOLLOW_COMMUNITY,
    UnFollowCommunityData,
    UnFollowCommunityVariables,
} from "./gql/Mutations";
import { localUid } from "../../../../../../global_state/UserState";

interface Props {
    community: CommunityType;
}

const CommunityHeader: React.FC<Props> = (props) => {
    const [error, setError] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { id: cmid } = props.community;
    const uid = localUid();

    const [followCommunity] = useMutation<
        FollowCommunityData,
        FollowCommunityVariables
    >(FOLLOW_COMMUNITY, {
        variables: {
            tid: cmid,
        },
        optimisticResponse: {
            followCommunity: {
                tid: cmid,
                sid: uid,
                name: "",
                time: "",
                entityType: 0,
            },
        },
        update(cache, { data: followData }) {
            if (followData?.followCommunity) {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        following(existing) {
                            return existing + 1;
                        },
                        coin(existing) {
                            return Math.max(
                                existing - FOLLOW_COMMUNITY_PRICE,
                                0
                            );
                        },
                    },
                });

                cache.modify({
                    id: cache.identify({
                        __typename: COMMUNITY_TYPENAME,
                        id: cmid,
                    }),
                    fields: {
                        amFollowing() {
                            return true;
                        },
                        followers(existing) {
                            return existing + 1;
                        },
                    },
                });

                setLoading(false);
            }
        },
    });

    const [unFollowCommunity] = useMutation<
        UnFollowCommunityData,
        UnFollowCommunityVariables
    >(UN_FOLLOW_COMMUNITY, {
        variables: {
            tid: cmid,
        },
        optimisticResponse: {
            unFollowCommunity: {
                tid: cmid,
                sid: uid,
                name: "",
                time: "",
                entityType: 0,
            },
        },
        update(cache, { data: unFollowData }) {
            if (unFollowData?.unFollowCommunity) {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        following(existing) {
                            return existing - 1;
                        },
                    },
                });

                cache.modify({
                    id: cache.identify({
                        __typename: COMMUNITY_TYPENAME,
                        id: cmid,
                    }),
                    fields: {
                        amFollowing() {
                            return false;
                        },
                        followers(existing) {
                            return existing - 1;
                        },
                    },
                });

                setLoading(false);
            }
        },
    });

    return (
        <View style={styles.headerContainer} pointerEvents="box-none">
            {!!error && <Text style={styles.followErrorText}>{error}</Text>}
            <View style={styles.headerHeader} pointerEvents="box-none">
                <View style={styles.headerLeft} pointerEvents="box-none">
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
                            onPress={async () => {
                                setError(null);
                                setLoading(true);
                                try {
                                    await unFollowCommunity();
                                } catch (e) {
                                    setError(
                                        "An error occurred.  Check your connection and try again"
                                    );
                                } finally {
                                    setLoading(false);
                                }
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
                                    await followCommunity();
                                } catch (e) {
                                    setError(
                                        `An error occurred.  Make sure your have ${FOLLOW_COMMUNITY_PRICE} digicoin and try again`
                                    );
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
            <View style={styles.headerBody} pointerEvents="none">
                <Text style={styles.descriptionText}>
                    {props.community.description}
                </Text>
            </View>
            <View style={styles.headerFooter} pointerEvents="none">
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
