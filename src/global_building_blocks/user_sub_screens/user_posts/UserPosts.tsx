import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, RefreshControl, Text, View } from "react-native";
import {
    NetworkStatus,
    useApolloClient,
    useMutation,
    useQuery,
} from "@apollo/client";
import {
    GET_USER_POSTS,
    GetUserPostsData,
    GetUserPostVariables,
} from "./gql/Queries";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import LoadingWheel from "../../loading_wheel/LoadingWheel";
import ErrorMessage from "../../error_message/ErrorMessage";
import Post from "../../post/Post";
import { palette } from "../../../global_styles/Palette";
import { globalScreenStyles } from "../../../global_styles/GlobalScreenStyles";
import { styles } from "./UserPostsStyles";
import {
    DONATE_TO_POST,
    DonateToPostData,
    DonateToPostVariables,
} from "../../post/gql/Mutations";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../view_tree/main/routes/tab_nav/screens/profile/gql/Queries";
import { localUid } from "../../../global_state/UserState";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../global_constants/screen_constants";
import CoinCountdown from "../../coin_countdown/CoinCountdown";
import { addNewReceipt } from "../../../global_state/CoinUpdates";
import {
    TRANSACTION_TYPENAME,
    TransactionIcon,
    TransactionType,
    TransactionTypesEnum,
} from "../../../global_types/TransactionTypes";
import { USER_TYPENAME } from "../../../global_types/UserTypes";
import { addTransaction } from "../../../view_tree/main/hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import { LastPostsFetchContext } from "../../../view_tree/main/context/last_fetch_time_context";
import { UserContext } from "../user_context/UserContext";
import { PostType } from "../../../global_types/PostTypes";
import { TabNavContext } from "../../../view_tree/main/routes/tab_nav/TabNavContext";

const nextPostsReward = 40;

const UserPosts: React.FC = () => {
    const myUid = localUid();

    const context = useContext(UserContext);

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        GetUserPostsData,
        GetUserPostVariables
    >(GET_USER_POSTS, {
        variables: { uid: context.uid },
        notifyOnNetworkStatusChange: true,
    });

    const { data: selfData } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        variables: {
            uid: myUid,
        },
    });

    const [donateToPost] = useMutation<DonateToPostData, DonateToPostVariables>(
        DONATE_TO_POST
    );

    const [jankyRef, setJankyRef] = useState<FlatList<PostType> | null>(null);

    const setThisRef = (element: any) => {
        setJankyRef(element);
    };

    const { profileScrollIndex } = useContext(TabNavContext);
    const scrollPropsAndRef = useCollapsibleScene("UserPosts");

    useEffect(() => {
        if (context.isProfile) {
            if (!!profileScrollIndex) {
                !!jankyRef &&
                    jankyRef.scrollToOffset({ animated: true, offset: 0 });
            }
        }
    }, [profileScrollIndex]);

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    const finalFeed = !!data?.userPosts
        ? data.userPosts.filter((post) => !!post)
        : [];

    const { lastPostsFetchTime, setLastPostsFetchTime } = useContext(
        LastPostsFetchContext
    );

    useEffect(() => {
        setLastPostsFetchTime(Date.now());
    }, [finalFeed.length]);

    const { cache } = useApolloClient();

    const userCoin: number = !!selfData?.user
        ? parseInt(selfData.user.coin)
        : 0;
    const userBolts: number = !!selfData?.user
        ? parseInt(selfData.user.bolts)
        : 0;
    const userFirstName = !!selfData?.user ? selfData.user.firstName : "";

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            ref={(r) => {
                scrollPropsAndRef.ref(r);
                context.isProfile && setThisRef(r);
            }}
            ListHeaderComponent={() => {
                if (
                    !data?.userPosts &&
                    networkStatus === NetworkStatus.loading
                ) {
                    return <LoadingWheel />;
                }

                if (!!error) {
                    return <ErrorMessage refresh={refetch} />;
                }

                if (finalFeed.length === 0) {
                    return (
                        <View style={styles.noPostsContainer}>
                            <Text style={styles.noPostsText}>
                                {myUid === context.uid
                                    ? "You haven't created any posts"
                                    : "User hasn't created any posts"}
                            </Text>
                        </View>
                    );
                } else if (SCREEN_LARGER_THAN_CONTENT) {
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
                    openUser={context.openUser}
                    openCommunity={context.openCommunity}
                    openPost={context.openPost}
                    onMessage={context.openNewMessage}
                    post={item}
                    openReport={context.openReport}
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
                        !!context.refreshHeader && context.refreshHeader();
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
            onEndReached={async () => {
                /*
                 * Only do automatic fetch more for our own posts
                 */
                if (myUid === context.uid) {
                    if (finalFeed.length > fetchMoreLen) {
                        const lastTime = finalFeed[finalFeed.length - 1].time;
                        const ffLen = finalFeed.length;

                        setFetchMoreLen(ffLen);

                        !!fetchMore &&
                            (await fetchMore({
                                variables: {
                                    lastTime,
                                    skipReward: true,
                                },
                            }));
                    }
                }
            }}
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
                                            message: "Viewed user posts",
                                            transactionType:
                                                TransactionTypesEnum.Post,
                                            transactionIcon:
                                                TransactionIcon.Feed,
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
                                                    const total = parseInt(
                                                        existing
                                                    );

                                                    return (
                                                        total + nextPostsReward
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

export default UserPosts;
