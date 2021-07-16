import React, { useContext, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./ProfileHeaderStyles";
import {
    FOLLOW_USER_PRICE,
    USER_TYPENAME,
    UserType,
} from "../../../global_types/UserTypes";
import Tier from "../../tier/Tier";
import { toCommaRep, toRep } from "../../../global_utils/ValueRepUtils";
import CoinBox from "../../coin_box/CoinBox";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { palette } from "../../../global_styles/Palette";
import { useMutation } from "@apollo/client";
import {
    FOLLOW_USER,
    FollowUserData,
    FollowUserVariables,
    UN_FOLLOW_USER,
    UnFollowUserData,
    UnFollowUserVariables,
} from "./gql/Mutation";
import { localUid } from "../../../global_state/UserState";
import TierModal from "./building_blocks/tier_modal/TierModal";
import { challengeCheck } from "../../../global_gql/challenge_check/challenge_check";
import { calculateLevelInfo } from "../../../global_utils/LevelUtils";
import UserOptionsModal from "./building_blocks/user_options_modal/UserOptionsModal";
import UpdateIndicator from "../../../view_tree/main/routes/tab_nav/building_blocks/update_indicator/UpdateIndicator";
import { nameFontToProfileStyle } from "./fonts/nameFonts";
import {
    bioColorToStyle,
    profileColor2Style,
    stickerToEmoji,
} from "../../../global_types/ShopTypes";
import { bioFont2Style } from "./fonts/bioFonts";
import BoltBox from "../../bolt_box/BoltBox";
import { stripUrlScheme } from "../../../global_utils/StringUtils";
import LevelInfoModal from "../user_stats/building_blocks/stats_header/building_blocks/level_info_modal/LevelInfoModal";
import RankingModal from "./building_blocks/ranking_modal/RankingModal";
import DigicoinModal from "./building_blocks/digicoin_modal/DigicoinModal";
import BoltsModal from "./building_blocks/bolts_modal/BoltsModal";

interface Props {
    user: UserType;
    isMe: boolean;
    openFollows: () => void;
    openReportUser: () => void;
    openSettings: () => void;
    openShop: () => void;
}

const ProfileHeader: React.FC<Props> = (props) => {
    const [error, setError] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [tierModalVisible, showTierModal] = useState<boolean>(false);
    const [levelModalVisible, showLevelModal] = useState<boolean>(false);
    const [rankingModalVisible, showRankingModal] = useState<boolean>(false);

    const [coinModalVisible, showCoinModal] = useState<boolean>(false);
    const [boltModalVisible, showBoltModal] = useState<boolean>(false);

    const uid = localUid();

    const [level] = useMemo<[number, number, number]>(
        () => calculateLevelInfo(parseInt(props.user.coinSpent)),
        [props.user.coinSpent]
    );

    const [follow] = useMutation<FollowUserData, FollowUserVariables>(
        FOLLOW_USER,
        {
            variables: {
                tid: props.user.id,
            },
            optimisticResponse: {
                followUser: {
                    tid: props.user.id,
                    sid: uid,
                    name: "",
                    time: "",
                    entityType: 0,
                },
            },
            update(cache, { data: followData }) {
                if (followData?.followUser) {
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
                                existing = parseInt(existing);

                                return Math.max(
                                    existing - FOLLOW_USER_PRICE,
                                    0
                                ).toString();
                            },
                        },
                    });

                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: props.user.id,
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

                    challengeCheck(cache);
                }
            },
        }
    );

    const [unFollow] = useMutation<UnFollowUserData, UnFollowUserVariables>(
        UN_FOLLOW_USER,
        {
            variables: {
                tid: props.user.id,
            },
            optimisticResponse: {
                unFollowUser: {
                    tid: props.user.id,
                    sid: uid,
                    name: "",
                    time: "",
                    entityType: 0,
                },
            },
            update(cache, { data: unFollowData }) {
                if (unFollowData?.unFollowUser) {
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
                            __typename: USER_TYPENAME,
                            id: props.user.id,
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
        }
    );

    return (
        <View pointerEvents="box-none">
            <View
                style={styles.profileHeaderContainer}
                pointerEvents="box-none"
            >
                {!!error && <Text style={styles.followErrorText}>{error}</Text>}
                {uid === props.user.id && (
                    <View
                        style={styles.shopButtonContainer}
                        pointerEvents="box-none"
                    >
                        {/*
                            IMPORTANT!!!

                            Keep onPress={() => props.openShop()}
                            instead of onPress={props.openShop}
                            otherwise the press event will be passed
                            to openShop and used inappropriately, which
                            causes a big ol' bug
                            */}
                        <TouchableOpacity
                            style={styles.shopButton}
                            onPress={() => props.openShop()}
                        >
                            <MaterialIcons
                                name="bolt"
                                size={18}
                                color={palette.white}
                            />
                            <Text style={styles.shopButtonText}>Shop</Text>
                            <MaterialIcons
                                name="bolt"
                                size={18}
                                color={palette.white}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.profileSplit0} pointerEvents="box-none">
                    <View style={styles.split0Left} pointerEvents="none">
                        {!!props.user.imgUrl ? (
                            <Image
                                style={styles.userImage}
                                source={{ uri: props.user.imgUrl }}
                            />
                        ) : (
                            <View style={styles.userIconContainer}>
                                <FontAwesome
                                    name="user"
                                    color={palette.white}
                                    size={30}
                                />
                            </View>
                        )}
                        <Text style={styles.profileIcon}>
                            {stickerToEmoji(props.user.profileSticker)}
                        </Text>
                    </View>
                    <View style={styles.split0Right} pointerEvents="box-none">
                        {props.isMe ? (
                            <TouchableOpacity onPress={props.openSettings}>
                                <Ionicons
                                    name="settings"
                                    size={24}
                                    color={palette.mediumGray}
                                />
                            </TouchableOpacity>
                        ) : loading ? (
                            <ActivityIndicator
                                color={palette.deepBlue}
                                size="small"
                            />
                        ) : props.user.amFollowing ? (
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={async () => {
                                    setError(null);
                                    setLoading(true);
                                    try {
                                        await unFollow();
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
                                        await follow();
                                    } catch (e) {
                                        setError(
                                            `An error occurred.  Make sure your have ${FOLLOW_USER_PRICE} digicoin and try again`
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
                                    amount={FOLLOW_USER_PRICE}
                                    fontSize={15}
                                    coinSize={23}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.profileSplit1} pointerEvents="box-none">
                    <View style={styles.split1Left} pointerEvents="box-none">
                        <TierModal
                            visible={tierModalVisible}
                            hide={() => showTierModal(false)}
                        />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => showTierModal(true)}
                        >
                            <Tier size={40} ranking={props.user.ranking} />
                        </TouchableOpacity>
                        <View style={styles.userLevelContainer}>
                            <View style={styles.profileUserBar}>
                                <Text
                                    style={[
                                        nameFontToProfileStyle(
                                            props.user.nameFont
                                        ),
                                        profileColor2Style(
                                            props.user.nameColor
                                        ),
                                    ]}
                                >
                                    {`${props.user.firstName} ${props.user.lastName}`}
                                </Text>
                                <UserOptionsModal
                                    openReportUser={props.openReportUser}
                                    uid={props.user.id}
                                />
                            </View>
                            <View style={styles.statsContainer}>
                                <RankingModal
                                    visible={rankingModalVisible}
                                    hide={() => showRankingModal(false)}
                                />
                                <TouchableOpacity
                                    onPress={() => showRankingModal(true)}
                                >
                                    <Text style={styles.profileRankingText}>
                                        {`Ranking: ${toCommaRep(
                                            props.user.ranking
                                        )}`}
                                    </Text>
                                </TouchableOpacity>
                                <LevelInfoModal
                                    user={props.user}
                                    visible={levelModalVisible}
                                    hide={() => showLevelModal(false)}
                                />
                                <TouchableOpacity
                                    onPress={() => showLevelModal(true)}
                                >
                                    <Text style={styles.profileLevelText}>
                                        {`Level: ${toCommaRep(level)}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.profileSplit3} pointerEvents="none">
                    {!!props.user.bio ? (
                        <>
                            <Text
                                style={[
                                    bioFont2Style(props.user.bioFont),
                                    bioColorToStyle(props.user.bioColor),
                                ]}
                            >
                                {props.user.bio}
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.noBioText}>No bio</Text>
                    )}
                </View>
                <View style={styles.split35} pointerEvents="box-none">
                    {!!props.user.link && (
                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={async () => {
                                try {
                                    await Linking.openURL(props.user.link);
                                } catch (e) {
                                    if (__DEV__) {
                                        console.log("Error opening url:", e);
                                    }
                                }
                            }}
                        >
                            <Text numberOfLines={1} style={styles.linkText}>
                                {stripUrlScheme(props.user.link)}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.profileSplit4} pointerEvents="box-none">
                    <View style={styles.split4Left} pointerEvents="box-none">
                        <TouchableOpacity
                            style={styles.followsButton}
                            activeOpacity={0.5}
                            onPress={props.openFollows}
                        >
                            <Text style={styles.followNumeralText}>
                                {toRep(props.user.followers)}
                                <Text style={styles.followsText}>
                                    {" Followers"}
                                </Text>
                            </Text>
                            <Text style={styles.followNumeralText}>
                                {toRep(props.user.following)}
                                <Text style={styles.followingText}>
                                    {" Following"}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.split4Right}>
                        <BoltsModal
                            visible={boltModalVisible}
                            hide={() => showBoltModal(false)}
                        />
                        <TouchableOpacity onPress={() => showBoltModal(true)}>
                            <BoltBox
                                amount={parseInt(props.user.bolts)}
                                paddingRight={10}
                                boltSize={25}
                                fontSize={15}
                                moveTextRight={2}
                            />
                        </TouchableOpacity>
                        <DigicoinModal
                            visible={coinModalVisible}
                            hide={() => showCoinModal(false)}
                        />
                        <TouchableOpacity onPress={() => showCoinModal(true)}>
                            <CoinBox
                                amount={parseInt(props.user.coin)}
                                coinSize={25}
                                fontSize={15}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

ProfileHeader.defaultProps = {
    isMe: false,
};

export default ProfileHeader;
