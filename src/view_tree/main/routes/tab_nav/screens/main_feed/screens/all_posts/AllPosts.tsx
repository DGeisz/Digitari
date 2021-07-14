import React, { useContext, useEffect, useState } from "react";
import { Animated, RefreshControl, Text, View } from "react-native";
import { AllPostsNavProp } from "../../MainFeedNavTypes";
import { FeedContext, FeedType } from "../../MainFeedContext";
import {
    NetworkStatus,
    useApolloClient,
    useMutation,
    useQuery,
} from "@apollo/client";
import { ALL_POSTS, AllPostsData, AllPostsVariables } from "./gql/Queries";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../profile/gql/Queries";
import { localUid } from "../../../../../../../../global_state/UserState";
import {
    DONATE_TO_POST,
    DonateToPostData,
    DonateToPostVariables,
} from "../../../../../../../../global_building_blocks/post/gql/Mutations";
import { LastPostsFetchContext } from "../../../../../../context/last_fetch_time_context";
import LoadingWheel from "../../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { styles } from "../../../../../../../../global_building_blocks/user_sub_screens/user_posts/UserPostsStyles";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../../../../../../global_constants/screen_constants";
import { globalScreenStyles } from "../../../../../../../../global_styles/GlobalScreenStyles";
import Post from "../../../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../../../global_styles/Palette";
import CoinCountdown from "../../../../../../../../global_building_blocks/coin_countdown/CoinCountdown";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../../../global_types/TransactionTypes";
import { addNewReceipt } from "../../../../../../../../global_state/CoinUpdates";
import { USER_TYPENAME } from "../../../../../../../../global_types/UserTypes";
import { addTransaction } from "../../../../../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import { TabNavContext } from "../../../../TabNavContext";

const nextPostsReward = 40;

interface Props {
    navigation: AllPostsNavProp;
}

const AllPosts: React.FC<Props> = (props) => {
    const { setType } = useContext(FeedContext);

    useEffect(() => {
        return props.navigation.addListener("focus", (e) => {
            setType(FeedType.AllPosts);
        });
    }, []);

    const {
        openPost,
        openCommunity,
        openUser,
        openNewMessage,
        openReport,
    } = useContext(TabNavContext);

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        AllPostsData,
        AllPostsVariables
    >(ALL_POSTS, {
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

    const [donateToPost] = useMutation<DonateToPostData, DonateToPostVariables>(
        DONATE_TO_POST
    );

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    const finalFeed = !!data?.allPosts
        ? data.allPosts.filter((post) => !!post)
        : [];

    const { lastPostsFetchTime, setLastPostsFetchTime } = useContext(
        LastPostsFetchContext
    );

    useEffect(() => {
        setLastPostsFetchTime(Date.now());
    }, [finalFeed.length]);

    const userCoin = !!selfData?.user ? selfData.user.coin : 0;
    const userBolts = !!selfData?.user ? selfData.user.bolts : 0;
    const userFirstName = !!selfData?.user ? selfData.user.firstName : "";

    const { cache } = useApolloClient();

    return (
        <Animated.FlatList
            ListHeaderComponent={() => {
                if (
                    !data?.allPosts &&
                    networkStatus === NetworkStatus.loading
                ) {
                    return <LoadingWheel />;
                }

                if (!!error) {
                    return <ErrorMessage refresh={refetch} />;
                }

                if (SCREEN_LARGER_THAN_CONTENT) {
                    return <View style={globalScreenStyles.headerBuffer} />;
                } else {
                    return null;
                }
            }}
            data={finalFeed}
            renderItem={({ item }) => (
                <Post
                    userBolts={userBolts}
                    donateToPost={donateToPost}
                    userCoin={userCoin}
                    userFirstName={userFirstName}
                    openUser={openUser}
                    openCommunity={openCommunity}
                    openPost={openPost}
                    onMessage={openNewMessage}
                    post={item}
                    openReport={openReport}
                />
            )}
            keyExtractor={(item) => [item.id, "userPosts"].join(":")}
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        refetch && refetch();
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
                        {!!finalFeed.length &&
                            (finalFeed.length !== fetchMoreLen ? (
                                <CoinCountdown
                                    referenceTime={lastPostsFetchTime}
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
                                            message: "Viewed Digitari posts",
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
                            ) : (
                                <View style={styles.endOfPostsContainer}>
                                    <Text style={styles.noPostsText}>
                                        You've reached the end!
                                    </Text>
                                </View>
                            ))}
                        <View style={globalScreenStyles.listFooterBuffer} />
                    </>
                );
            }}
        />
    );
};

export default AllPosts;
