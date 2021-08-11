import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./CommunityHeaderStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import {
    COMMUNITY_TYPENAME,
    CommunityType,
    FOLLOW_COMMUNITY_PRICE,
    FOLLOW_COMMUNITY_REWARD,
} from "../../../../../../global_types/CommunityTypes";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";
import { dateFormatter } from "../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { useMutation, useQuery } from "@apollo/client";
import {
    FOLLOW_USER_REWARD,
    USER_TYPENAME,
} from "../../../../../../global_types/UserTypes";
import {
    FOLLOW_COMMUNITY,
    FollowCommunityData,
    FollowCommunityVariables,
    UN_FOLLOW_COMMUNITY,
    UnFollowCommunityData,
    UnFollowCommunityVariables,
} from "./gql/Mutations";
import { localUid } from "../../../../../../global_state/UserState";
import CommunityOptionsModal from "./building_blocks/community_options_modal/CommunityOptionsModal";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import BoltBox from "../../../../../../global_building_blocks/bolt_box/BoltBox";
import FlyingBolt from "../../../../../../global_building_blocks/flying_bolt/FlyingBolt";
import DigicodeModal from "../../../../../../global_building_blocks/digicode_modal/DigicodeModal";
import { DigicodeType } from "../../../../../../global_types/DigicodeTypes";
import { addBoltTransaction } from "../../../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import {
    TransactionIcon,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";

interface Props {
    community: CommunityType;
    openReportCommunity: () => void;
}

const CommunityHeader: React.FC<Props> = (props) => {
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

    const { id: cmid } = props.community;
    const uid = localUid();

    const [codeModalVisible, showCodeModal] = useState<boolean>(false);

    /*Fuse for flying bolt*/
    const [fuse, setFuse] = useState<number>(0);

    /*Get self*/
    const { data: selfData } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

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
                            existing = parseInt(existing);

                            return Math.max(
                                existing - FOLLOW_COMMUNITY_PRICE,
                                0
                            ).toString();
                        },
                        boltTransTotal(existing) {
                            existing = parseInt(existing);

                            return (
                                existing + FOLLOW_COMMUNITY_REWARD
                            ).toString();
                        },
                    },
                });

                addBoltTransaction(
                    {
                        tid: uid,
                        time: Date.now().toString(),
                        bolts: FOLLOW_USER_REWARD,
                        message: `You followed ${props.community.name}`,
                        transactionIcon: TransactionIcon.Community,
                        transactionType: TransactionTypesEnum.Community,
                        data: props.community.id,
                    },
                    cache
                );

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
                        bolts(existing) {
                            existing = parseInt(existing);

                            return Math.max(
                                existing - FOLLOW_COMMUNITY_REWARD,
                                0
                            ).toString();
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
            <DigicodeModal
                visible={codeModalVisible}
                hide={() => showCodeModal(false)}
                code={{ id: props.community.id, type: DigicodeType.Community }}
                title={props.community.name}
            />
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
                    <CommunityOptionsModal
                        openReportCommunity={props.openReportCommunity}
                        cmid={cmid}
                    />
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.followContainer}>
                        {loading ? (
                            <ActivityIndicator
                                color={palette.deepBlue}
                                size="small"
                            />
                        ) : !props.community.amFollowing ? (
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={async () => {
                                    if (!!selfData?.user) {
                                        const self = selfData.user;

                                        if (
                                            parseInt(self.bolts) <
                                            FOLLOW_COMMUNITY_REWARD
                                        ) {
                                            setErrorMessage(
                                                `You need ${FOLLOW_COMMUNITY_REWARD} bolts to unfollow ${props.community.name}`
                                            );
                                        } else {
                                            setLoading(true);

                                            try {
                                                await unFollowCommunity();
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
                                    } else {
                                        setLoading(true);

                                        try {
                                            await unFollowCommunity();
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
                                }}
                            >
                                <View
                                    style={styles.unFollowButtonTextContainer}
                                >
                                    <Text style={styles.followButtonText}>
                                        Unfollow
                                    </Text>
                                </View>
                                <BoltBox
                                    amount={FOLLOW_COMMUNITY_REWARD}
                                    fontSize={15}
                                    boltSize={20}
                                    moveTextRight={2}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={async () => {
                                    if (!!selfData?.user) {
                                        const self = selfData.user;

                                        if (
                                            parseInt(self.coin) <
                                            FOLLOW_COMMUNITY_PRICE
                                        ) {
                                            setErrorMessage(
                                                `You need ${FOLLOW_COMMUNITY_PRICE} coin to follow ${props.community.name}`
                                            );
                                        } else if (
                                            self.following >= self.maxFollowing
                                        ) {
                                            setErrorMessage(
                                                `You need to level-up to follow ${props.community.name}`
                                            );
                                        } else {
                                            setLoading(true);
                                            setFuse(1 + Math.random());

                                            try {
                                                await followCommunity();
                                            } catch (e) {
                                                if (__DEV__) {
                                                    console.log(
                                                        "This is follow error"
                                                    );

                                                    setErrorMessage(
                                                        "Hmm... Something went wrong. Try again in a bit"
                                                    );
                                                }
                                            }

                                            setLoading(false);
                                        }
                                    } else {
                                        setLoading(true);

                                        try {
                                            await followCommunity();
                                        } catch (e) {
                                            setErrorMessage(
                                                `Hmm, something went wrong.  Make sure your have ${FOLLOW_COMMUNITY_PRICE} digicoin and try again`
                                            );
                                        }

                                        setLoading(false);
                                    }
                                }}
                            >
                                <View style={styles.followButtonTextContainer}>
                                    <Text style={styles.followButtonText}>
                                        Follow
                                    </Text>
                                    <BoltBox
                                        amount={FOLLOW_COMMUNITY_REWARD}
                                        boxColor={palette.lightForestGreen}
                                        boltSize={16}
                                        fontSize={12}
                                        paddingVertical={4}
                                        showBoltPlus
                                        moveTextRight={2}
                                    />
                                </View>
                                <CoinBox
                                    amount={FOLLOW_COMMUNITY_PRICE}
                                    fontSize={14}
                                    coinSize={23}
                                    showCoinMinus
                                    fontColor={palette.danger}
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
                </View>
            </View>
            <TouchableOpacity onPress={() => showCodeModal(true)}>
                <Text style={styles.nameText}>{props.community.name}</Text>
            </TouchableOpacity>
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
                            {/*{toRep(5448)}*/}
                            {/*TODO: Change this for screenshots*/}
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
                        {/*TODO: Change this for screenshots*/}
                        {/*{`Created: 5/11/2021`}*/}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CommunityHeader;
