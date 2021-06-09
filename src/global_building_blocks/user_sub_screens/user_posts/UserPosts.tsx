import React, { useContext, useEffect, useState } from "react";
import { Animated, RefreshControl, Text, View } from "react-native";
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
import { TutorialContext } from "../../../view_tree/tutorial/context/tutorial_context/TutorialContext";
import CoinCountdown from "../../coin_countdown/CoinCountdown";
import { addNewReceipt } from "../../../global_state/CoinUpdates";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../global_types/TransactionTypes";
import { USER_TYPENAME } from "../../../global_types/UserTypes";
import { addTransaction } from "../../../view_tree/main/hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";

const nextPostsReward = 40;

interface Props {
    routeKey: string;
    uid: string;
    openPost: (pid: string) => void;
    openNewMessage: (tname: string, pid: string, responseCost: number) => void;
    openCommunity: (cmid: string) => void;
    openUser: (uid: string) => void;
    refreshHeader: () => void;
    openReport: (pid: string) => void;
}

const UserPosts: React.FC<Props> = (props) => {
    const myUid = localUid();

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        GetUserPostsData,
        GetUserPostVariables
    >(GET_USER_POSTS, {
        variables: { uid: props.uid },
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

    const [lastFetchTime, setLastFetch] = useState<number>(Date.now());

    const { tutorialActive } = useContext(TutorialContext);

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    const finalFeed = tutorialActive
        ? []
        : !!data?.userPosts
        ? data.userPosts.filter((post) => !!post)
        : [];

    useEffect(() => {
        setLastFetch(Date.now());
    }, [finalFeed.length]);

    const { cache } = useApolloClient();

    const userCoin = !!selfData?.user ? selfData.user.coin : 0;
    const userFirstName = !!selfData?.user ? selfData.user.firstName : "";

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            ListHeaderComponent={() => {
                if (
                    !tutorialActive &&
                    !data?.userPosts &&
                    networkStatus === NetworkStatus.loading
                ) {
                    return <LoadingWheel />;
                }

                if (!tutorialActive && error) {
                    return <ErrorMessage refresh={refetch} />;
                }

                if (finalFeed.length === 0) {
                    return (
                        <View style={styles.noPostsContainer}>
                            <Text style={styles.noPostsText}>
                                This user hasn't created any posts
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
                    donateToPost={donateToPost}
                    userCoin={userCoin}
                    userFirstName={userFirstName}
                    openUser={props.openUser}
                    openCommunity={props.openCommunity}
                    openPost={props.openPost}
                    onMessage={props.openNewMessage}
                    post={item}
                    openReport={props.openReport}
                />
            )}
            keyExtractor={(item, index) =>
                [item.id, "userPosts", index].join(":")
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
            onEndReached={async () => {
                /*
                 * Only do automatic fetch more for our own posts
                 */
                if (myUid === props.uid) {
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
                        {finalFeed.length !== fetchMoreLen && (
                            <CoinCountdown
                                referenceTime={lastFetchTime}
                                onNextPosts={async () => {
                                    const lastTime =
                                        finalFeed[finalFeed.length - 1].time;
                                    const ffLen = finalFeed.length;

                                    setFetchMoreLen(ffLen);

                                    const transaction: TransactionType = {
                                        tid: localUid(),
                                        time: Date.now().toString(),
                                        coin: nextPostsReward,
                                        message: "Viewed user posts",
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
                                                    existing + nextPostsReward
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
                                        finalFeed[finalFeed.length - 1].time;
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

export default UserPosts;
