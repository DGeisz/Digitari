import React, { useEffect, useState } from "react";
import {
    Animated,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    NetworkStatus,
    useApolloClient,
    useMutation,
    useQuery,
} from "@apollo/client";
import {
    GET_COMMUNITY_POSTS,
    GetCommunityPostsData,
    GetCommunityPostsVariables,
    MAX_COMMUNITY_POSTS_PER_PAGE,
} from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../global_styles/Palette";
import { globalScreenStyles } from "../../../../../../global_styles/GlobalScreenStyles";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { TierEmoji, TierEnum } from "../../../../../../global_types/TierTypes";
import { styles } from "./CommunityPostStyles";
import { CommunityNavProp } from "../../../../MainEntryNavTypes";
import { tierBarStyles } from "../styles/tierBarStyles";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import {
    DONATE_TO_POST,
    DonateToPostData,
    DonateToPostVariables,
} from "../../../../../../global_building_blocks/post/gql/Mutations";
import { localUid } from "../../../../../../global_state/UserState";
import CoinCountdown from "../../../../../../global_building_blocks/coin_countdown/CoinCountdown";
import { addNewReceipt } from "../../../../../../global_state/CoinUpdates";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { addTransaction } from "../../../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";

const nextPostsReward = 40;

interface Props {
    routeKey: string;
    cmid: string;
    navigation: CommunityNavProp;
    refreshHeader: () => void;
}

const CommunityPosts: React.FC<Props> = (props) => {
    const [tier, setTier] = useState<TierEnum | undefined>(undefined);

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        GetCommunityPostsData,
        GetCommunityPostsVariables
    >(GET_COMMUNITY_POSTS, {
        variables: {
            cmid: props.cmid,
            tier,
        },
        notifyOnNetworkStatusChange: true,
    });

    const { data: selfData } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        variables: {
            uid: localUid(),
        },
    });

    const userCoin = !!selfData?.user ? selfData.user.coin : 0;
    const userFirstName = !!selfData?.user ? selfData.user.firstName : "";

    const [donateToPost] = useMutation<DonateToPostData, DonateToPostVariables>(
        DONATE_TO_POST
    );

    const [lastFetchTime, setLastFetch] = useState<number>(Date.now());

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    const finalFeed = !!data?.communityPosts
        ? data.communityPosts.filter((post) => !!post)
        : [];

    useEffect(() => {
        setFetchMoreLen(0);
    }, [tier]);

    useEffect(() => {
        setLastFetch(Date.now());
    }, [finalFeed.length]);

    const { cache } = useApolloClient();

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            ListHeaderComponent={() => {
                return (
                    <>
                        <ScrollView horizontal style={tierBarStyles.tierBar}>
                            <View style={tierBarStyles.tierBarContainer}>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === undefined
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(undefined)}
                                    key={[props.cmid, "all"].join(":")}
                                >
                                    <Text
                                        style={[
                                            tierBarStyles.tierOptionText,
                                            {
                                                color:
                                                    tier === undefined
                                                        ? palette.white
                                                        : palette.hardGray,
                                            },
                                        ]}
                                    >
                                        All
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Angel
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Angel)}
                                    key={[props.cmid, "angel"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Angel}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.HeartEyes
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.HeartEyes)}
                                    key={[props.cmid, "heart"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.HeartEyes}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Sunglasses
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Sunglasses)}
                                    key={[props.cmid, "sun"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Sunglasses}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Hugging
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Hugging)}
                                    key={[props.cmid, "hug"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Hugging}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Grinning
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Grinning)}
                                    key={[props.cmid, "grin"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Grinning}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Smiling
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Smiling)}
                                    key={[props.cmid, "smile"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Smiling}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.SlightlySmiling
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() =>
                                        setTier(TierEnum.SlightlySmiling)
                                    }
                                    key={[props.cmid, "ssmile"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.SlightlySmiling}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Frowning
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Frowning)}
                                    key={[props.cmid, "frown"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Frowning}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Steam
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Steam)}
                                    key={[props.cmid, "steam"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Steam}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.AngryHorns
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.AngryHorns)}
                                    key={[props.cmid, "horns"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.AngryHorns}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        {!data?.communityPosts ||
                        networkStatus === NetworkStatus.loading ? (
                            <LoadingWheel />
                        ) : error ? (
                            <ErrorMessage refresh={refetch} />
                        ) : finalFeed.length === 0 ? (
                            <View style={styles.noPostsContainer}>
                                <Text style={styles.noPostsText}>
                                    No one at this tier has posted to this
                                    community
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.postsBuffer} />
                        )}
                    </>
                );
            }}
            data={finalFeed}
            renderItem={({ item }) => (
                <Post
                    donateToPost={donateToPost}
                    userFirstName={userFirstName}
                    userCoin={userCoin}
                    openUser={(uid: string) => {
                        props.navigation.push("User", { uid });
                    }}
                    openCommunity={(cmid: string) => {
                        props.navigation.push("Community", { cmid });
                    }}
                    openPost={(pid: string) => {
                        props.navigation.push("PostScreen", { pid });
                    }}
                    openReport={(pid: string) => {
                        props.navigation.push("ReportPost", { pid });
                    }}
                    onMessage={(
                        tname: string,
                        pid: string,
                        responseCost: number
                    ) => {
                        props.navigation.push("NewResponse", {
                            tname,
                            pid,
                            responseCost,
                        });
                    }}
                    post={item}
                />
            )}
            keyExtractor={(item, index) =>
                [item.id, "comPosts", index].join(":")
            }
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        refetch && refetch();
                        !!props.refreshHeader && props.refreshHeader();
                        setTimeout(() => {
                            setStillSpin(false);
                        }, 1000);
                    }}
                    colors={[
                        palette.deepBlue,
                        palette.darkForestGreen,
                        palette.oceanSurf,
                    ]}
                    tintColor={palette.deepBlue}
                />
            }
            ListFooterComponent={() => {
                return networkStatus === NetworkStatus.fetchMore ? (
                    <LoadingWheel />
                ) : (
                    <>
                        {finalFeed.length !== fetchMoreLen &&
                            !!finalFeed.length && (
                                <CoinCountdown
                                    referenceTime={lastFetchTime}
                                    onNextPosts={async () => {
                                        const lastTime =
                                            finalFeed[finalFeed.length - 1]
                                                .time;
                                        const ffLen = finalFeed.length;

                                        setFetchMoreLen(ffLen);

                                        const transaction: TransactionType = {
                                            tid: localUid(),
                                            time: Date.now().toString(),
                                            coin: nextPostsReward,
                                            message: "Viewed community posts",
                                            transactionType:
                                                TransactionTypesEnum.Post,
                                            data: "",
                                            __typename: TRANSACTION_TYPENAME,
                                        };

                                        /*
                                         * Add receipt for animation
                                         */
                                        addNewReceipt(nextPostsReward);

                                        /*
                                         * Notify user of new transaction update
                                         */
                                        cache.modify({
                                            id: cache.identify({
                                                __typename: USER_TYPENAME,
                                                id: localUid(),
                                            }),
                                            fields: {
                                                newTransactionUpdate() {
                                                    return true;
                                                },
                                                transTotal(existing) {
                                                    return (
                                                        existing +
                                                        nextPostsReward
                                                    );
                                                },
                                            },
                                        });

                                        addTransaction(transaction, cache);

                                        !!fetchMore &&
                                            (await fetchMore({
                                                variables: {
                                                    lastTime,
                                                },
                                            }));
                                    }}
                                    amount={nextPostsReward}
                                    showSkip
                                    onSkip={async () => {
                                        const lastTime =
                                            finalFeed[finalFeed.length - 1]
                                                .time;
                                        const ffLen = finalFeed.length;

                                        setFetchMoreLen(ffLen);

                                        !!fetchMore &&
                                            (await fetchMore({
                                                variables: {
                                                    lastTime,
                                                    skipReward: true,
                                                },
                                            }));
                                    }}
                                />
                            )}
                        <View style={globalScreenStyles.listFooterBuffer} />
                    </>
                );
            }}
        />
    );
};

export default CommunityPosts;
