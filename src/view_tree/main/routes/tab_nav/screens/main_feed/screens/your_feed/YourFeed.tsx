import React, { useContext, useEffect, useRef, useState } from "react";
import {
    localFirstName,
    localUid,
} from "../../../../../../../../global_state/UserState";
import { TabNavContext } from "../../../../TabNavContext";
import {
    NetworkStatus,
    useApolloClient,
    useMutation,
    useQuery,
} from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../profile/gql/Queries";
import {
    DONATE_TO_POST,
    DonateToPostData,
    DonateToPostVariables,
} from "../../../../../../../../global_building_blocks/post/gql/Mutations";
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import LoadingWheel from "../../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { styles } from "../../MainFeedStyles";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../../../../../../global_constants/screen_constants";
import { globalScreenStyles } from "../../../../../../../../global_styles/GlobalScreenStyles";
import Post from "../../../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../../../global_styles/Palette";
import CoinCountdown from "../../../../../../../../global_building_blocks/coin_countdown/CoinCountdown";
import { addNewReceipt } from "../../../../../../../../global_state/CoinUpdates";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../../../global_types/TransactionTypes";
import { USER_TYPENAME } from "../../../../../../../../global_types/UserTypes";
import { addTransaction } from "../../../../../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import NewButton from "../../../../../../../../global_building_blocks/new_button/NewButton";
import { YourFeedNavProp } from "../../MainFeedNavTypes";
import { FeedContext, FeedType } from "../../MainFeedContext";
import { GET_FEED, GetFeedData, GetFeedVariables } from "./gql/Queries";

const nextPostsReward = 80;

interface Props {
    navigation: YourFeedNavProp;
}

const YourFeed: React.FC<Props> = (props) => {
    const uid = localUid();

    const { feedType, setType } = useContext(FeedContext);

    useEffect(() => {
        if (feedType === FeedType.YourFeed) {
            props.navigation.navigate("YourFeed");
        }

        return props.navigation.addListener("focus", (e) => {
            setType(FeedType.YourFeed);
        });
    }, []);

    useEffect(() => {
        if (feedType === FeedType.YourFeed) {
            props.navigation.navigate("YourFeed");
        } else {
            props.navigation.navigate("AllPosts");
        }
    }, [feedType]);

    const {
        openPost,
        openCommunity,
        openUser,
        openNewMessage,
        openReport,
    } = useContext(TabNavContext);

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        GetFeedData,
        GetFeedVariables
    >(GET_FEED, {
        notifyOnNetworkStatusChange: true,
    });

    const {
        data: selfData,
        loading: selfLoading,
        error: selfError,
        refetch: selfRefetch,
    } = useQuery<GetUserQueryData, GetUserQueryVariables>(GET_USER, {
        variables: {
            uid,
        },
    });

    const [donateToPost] = useMutation<DonateToPostData, DonateToPostVariables>(
        DONATE_TO_POST
    );

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const listRef = useRef<FlatList>(null);

    const [lastFetchTime, setLastFetch] = useState<number>(Date.now());

    const finalFeed = !!data?.feed ? data.feed.filter((post) => !!post) : [];

    const userCoin: number = !!selfData?.user
        ? parseInt(selfData.user.coin)
        : 0;
    const userBolts: number = !!selfData?.user
        ? parseInt(selfData.user.bolts)
        : 0;

    const firstName = localFirstName();

    const userFirstName = !!selfData?.user
        ? selfData.user.firstName
        : firstName;

    useEffect(() => {
        setLastFetch(Date.now());
    }, [finalFeed.length]);

    const { cache } = useApolloClient();

    if (
        (!data?.feed && networkStatus === NetworkStatus.loading) ||
        (!selfData?.user && selfLoading)
    ) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (selfError) {
        return <ErrorMessage refresh={selfRefetch} />;
    }

    return finalFeed.length === 0 ? (
        <View style={styles.noFeedContainer}>
            <Text style={styles.noFeedText}>
                Follow some users or communities to start receiving their new
                posts in your feed!
                {"\n\n"}
                If you're looking to make some extra digibolts, just hit up "All
                Posts."
            </Text>
            <TouchableOpacity
                onPress={() => {
                    !!refetch && refetch();
                }}
            >
                <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <FlatList
            ref={listRef}
            ListHeaderComponent={
                SCREEN_LARGER_THAN_CONTENT ? (
                    <View style={globalScreenStyles.headerBuffer} />
                ) : null
            }
            data={finalFeed}
            renderItem={({ item }) => (
                <Post
                    userCoin={userCoin}
                    userBolts={userBolts}
                    userFirstName={userFirstName}
                    openUser={openUser}
                    openCommunity={openCommunity}
                    openPost={openPost}
                    onMessage={openNewMessage}
                    post={item}
                    feedPost
                    donateToPost={donateToPost}
                    openReport={openReport}
                />
            )}
            keyExtractor={(item, index) => [item.id, "feed", index].join(":")}
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);

                        setTimeout(() => {
                            setStillSpin(false);
                        }, 1000);

                        !!fetchMoreLen && setFetchMoreLen(0);
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
                        {(() => {
                            return finalFeed.length !== fetchMoreLen &&
                                !!finalFeed.length ? (
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
                                            message: "Viewed feed",
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
                                                    existing = parseInt(
                                                        existing
                                                    );

                                                    return (
                                                        existing +
                                                        nextPostsReward
                                                    ).toString();
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
                                    amount={nextPostsReward}
                                />
                            ) : (
                                <View style={styles.noFeedContainer}>
                                    <Text style={styles.noFeedText}>
                                        Your feed is all out of posts!
                                        {"\n\n"}
                                        Follow more users or communities to
                                        receive more posts in your feed.
                                        {"\n\n"}
                                        You can still earn digicoin by viewing
                                        user or community posts.
                                    </Text>
                                </View>
                            );
                        })()}
                        <View style={globalScreenStyles.listFooterBuffer} />
                    </>
                );
            }}
        />
    );
};

export default YourFeed;
