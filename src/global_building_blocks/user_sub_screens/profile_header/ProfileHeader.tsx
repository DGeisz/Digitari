import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    LayoutAnimation,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./ProfileHeaderStyles";
import {
    FOLLOW_USER_PRICE,
    FOLLOW_USER_REWARD,
    USER_TYPENAME,
    UserType,
} from "../../../global_types/UserTypes";
import Tier from "../../tier/Tier";
import { toCommaRep, toRep } from "../../../global_utils/ValueRepUtils";
import CoinBox from "../../coin_box/CoinBox";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { palette } from "../../../global_styles/Palette";
import { useMutation, useQuery } from "@apollo/client";
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
import RankingModal from "./building_blocks/ranking_modal/RankingModal";
import DigicoinModal from "./building_blocks/digicoin_modal/DigicoinModal";
import BoltsModal from "./building_blocks/bolts_modal/BoltsModal";
import PicModal from "../../post/building_blocks/pic_modal/PicModal";
import { levelTasksComplete } from "../../../view_tree/main/screens/level_up/utils/task_progress_utils";
import { calculateLevel } from "../../../global_types/LevelTypes";
import FlyingBolt from "../../flying_bolt/FlyingBolt";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../view_tree/main/routes/tab_nav/screens/profile/gql/Queries";

interface Props {
    user: UserType;
    isMe: boolean;
    openFollows: () => void;
    openReportUser: () => void;
    openSettings: () => void;
    openShop: () => void;
    openLevelUp: () => void;
}

const ProfileHeader: React.FC<Props> = (props) => {
    const [error, setError] = useState<string | null>("");
    const [errorTimeout, setErrorTimeout] = useState<number | null>();

    const setErrorMessage = (msg: string) => {
        LayoutAnimation.easeInEaseOut();
        setError(msg);

        if (!!errorTimeout) {
            clearTimeout(errorTimeout);
        }

        setErrorTimeout(
            setTimeout(() => {
                LayoutAnimation.easeInEaseOut();
                setError("");

                setErrorTimeout(null);
            }, 4000)
        );
    };

    /*
     * Clean up the error flow after we dismount
     */
    useEffect(() => {
        return () => {
            setErrorTimeout((errorTimeout) => {
                if (!!errorTimeout) {
                    clearTimeout(errorTimeout);
                }

                return null;
            });
        };
    }, []);

    const [loading, setLoading] = useState<boolean>(false);

    const [tierModalVisible, showTierModal] = useState<boolean>(false);
    const [rankingModalVisible, showRankingModal] = useState<boolean>(false);

    const [coinModalVisible, showCoinModal] = useState<boolean>(false);
    const [boltModalVisible, showBoltModal] = useState<boolean>(false);

    const [picModalVisible, showPicModal] = useState<boolean>(false);

    const uid = localUid();

    /*Fuse for flying bolt*/
    const [fuse, setFuse] = useState<number>(0);

    /*Get self*/
    const { data: selfData } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

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
                if (!!followData?.followUser) {
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
                            bolts(existing) {
                                existing = parseInt(existing);

                                return Math.max(
                                    existing - FOLLOW_USER_REWARD,
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

    const tasksCompleted = levelTasksComplete(
        calculateLevel(props.user.level),
        props.user
    );

    const pulseLevelUp = tasksCompleted || props.user.level === 0;

    return (
        <View pointerEvents="box-none">
            <View
                style={styles.profileHeaderContainer}
                pointerEvents="box-none"
            >
                {!!error && <Text style={styles.followErrorText}>{error}</Text>}
                {uid === props.user.id && (
                    <View
                        style={styles.topButtonsContainer}
                        pointerEvents="box-none"
                    >
                        <TouchableOpacity
                            style={styles.levelUpButton}
                            onPress={props.openLevelUp}
                        >
                            <View style={styles.levelUpBoltContainer}>
                                {pulseLevelUp && (
                                    <View style={styles.boltUpdate}>
                                        <UpdateIndicator dotSize={2} />
                                    </View>
                                )}
                                <MaterialIcons
                                    name="bolt"
                                    size={18}
                                    color={palette.deepBlue}
                                />
                            </View>
                            <Text style={styles.levelUpButtonText}>
                                Level Up
                            </Text>
                            <View style={styles.levelUpBoltContainer}>
                                {pulseLevelUp && (
                                    <View style={styles.boltUpdate}>
                                        <UpdateIndicator dotSize={2} />
                                    </View>
                                )}
                                <MaterialIcons
                                    name="bolt"
                                    size={18}
                                    color={palette.deepBlue}
                                />
                            </View>
                        </TouchableOpacity>
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
                    <View style={styles.split0Left}>
                        {!!props.user.imgUrl ? (
                            <>
                                <PicModal
                                    url={props.user.imgUrl}
                                    visible={picModalVisible}
                                    hide={() => showPicModal(false)}
                                />
                                <TouchableOpacity
                                    onPress={() => showPicModal(true)}
                                    activeOpacity={1}
                                >
                                    <Image
                                        style={styles.userImage}
                                        source={{ uri: props.user.imgUrl }}
                                    />
                                </TouchableOpacity>
                            </>
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
                        ) : (
                            <View style={styles.followContainer}>
                                {loading ? (
                                    <ActivityIndicator
                                        color={palette.deepBlue}
                                        size="small"
                                    />
                                ) : props.user.amFollowing ? (
                                    <TouchableOpacity
                                        style={styles.followButton}
                                        onPress={async () => {
                                            if (!!selfData?.user) {
                                                const self = selfData.user;

                                                if (
                                                    parseInt(self.bolts) <
                                                    FOLLOW_USER_REWARD
                                                ) {
                                                    setErrorMessage(
                                                        `You need ${FOLLOW_USER_REWARD} bolts to unfollow ${props.user.firstName}`
                                                    );
                                                } else {
                                                    setLoading(true);

                                                    try {
                                                        await unFollow();
                                                    } catch (e) {
                                                        if (__DEV__) {
                                                            console.log(
                                                                "This is unfollow error: ",
                                                                e
                                                            );
                                                        }
                                                        setErrorMessage(
                                                            "Hmm... Something went wrong. Try again in a bit."
                                                        );
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <View
                                            style={
                                                styles.unFollowButtonTextContainer
                                            }
                                        >
                                            <Text
                                                style={styles.followButtonText}
                                            >
                                                Unfollow
                                            </Text>
                                        </View>
                                        <BoltBox
                                            amount={FOLLOW_USER_REWARD}
                                            fontSize={15}
                                            boltSize={20}
                                            moveTextRight={2}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.followButton}
                                        onPress={async () => {
                                            /*
                                             * If we successfully fetched the user, we can do
                                             * all our fancy checks (this should always work)
                                             */
                                            if (!!selfData?.user) {
                                                const self = selfData.user;

                                                if (
                                                    parseInt(self.coin) <
                                                    FOLLOW_USER_PRICE
                                                ) {
                                                    setErrorMessage(
                                                        `You need ${FOLLOW_USER_PRICE} coin to follow ${props.user.firstName}!`
                                                    );
                                                } else if (
                                                    self.following >=
                                                    self.maxFollowing
                                                ) {
                                                    setErrorMessage(
                                                        `You need to level-up to follow ${props.user.firstName}!`
                                                    );
                                                } else if (
                                                    props.user.followers >=
                                                    props.user.maxFollowers
                                                ) {
                                                    setErrorMessage(
                                                        "This user needs to level-up before you can follow them!"
                                                    );

                                                    try {
                                                        await follow({
                                                            optimisticResponse: {
                                                                followUser: undefined,
                                                            },
                                                        });
                                                    } catch (e) {
                                                        if (__DEV__) {
                                                            console.log(
                                                                "The follow didn't go through: ",
                                                                e
                                                            );
                                                        }
                                                    }
                                                } else {
                                                    /*
                                                     * We've exhausted all the edge cases,
                                                     * give this a go
                                                     */
                                                    setLoading(true);
                                                    setFuse(1 + Math.random());

                                                    try {
                                                        await follow({
                                                            optimisticResponse: {
                                                                followUser: undefined,
                                                            },
                                                        });
                                                    } catch (e) {
                                                        if (__DEV__) {
                                                            console.log(
                                                                "This is follow error: ",
                                                                e
                                                            );
                                                        }

                                                        setErrorMessage(
                                                            "Hmm... Something went wrong. Try again in a bit"
                                                        );
                                                    }

                                                    setLoading(false);
                                                }
                                            } else {
                                                /*
                                                 * Otherwise, we just do a basic follow
                                                 */
                                                setLoading(true);

                                                try {
                                                    await follow();
                                                } catch (e) {
                                                    setErrorMessage(
                                                        `An error occurred.  Make sure your have ${FOLLOW_USER_PRICE} digicoin and try again`
                                                    );
                                                }

                                                setLoading(false);
                                            }
                                        }}
                                    >
                                        <View
                                            style={
                                                styles.followButtonTextContainer
                                            }
                                        >
                                            <Text
                                                style={styles.followButtonText}
                                            >
                                                Follow
                                            </Text>
                                            <BoltBox
                                                amount={FOLLOW_USER_REWARD}
                                                boxColor={
                                                    palette.lightForestGreen
                                                }
                                                boltSize={16}
                                                fontSize={12}
                                                paddingVertical={4}
                                                showBoltPlus
                                                moveTextRight={2}
                                            />
                                        </View>
                                        <CoinBox
                                            amount={FOLLOW_USER_PRICE}
                                            fontSize={15}
                                            coinSize={23}
                                        />
                                    </TouchableOpacity>
                                )}
                                <View style={styles.flyingBoltContainer}>
                                    <FlyingBolt
                                        animationHeight={100}
                                        amount={20}
                                        boltSize={20}
                                        fontSize={20}
                                        fuse={fuse}
                                    />
                                </View>
                            </View>
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
                                <Text style={styles.profileLevelText}>
                                    {`Level: ${toCommaRep(props.user.level)}`}
                                </Text>
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
                                {uid === props.user.id && (
                                    <Text style={styles.followMaxText}>
                                        {" "}
                                        / {toRep(props.user.maxFollowers)}{" "}
                                    </Text>
                                )}
                                <Text style={styles.followsText}>
                                    {" Followers"}
                                </Text>
                            </Text>
                            <Text style={styles.followNumeralText}>
                                {toRep(props.user.following)}
                                {uid === props.user.id && (
                                    <Text style={styles.followMaxText}>
                                        {" "}
                                        / {toRep(props.user.maxFollowing)}{" "}
                                    </Text>
                                )}
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
