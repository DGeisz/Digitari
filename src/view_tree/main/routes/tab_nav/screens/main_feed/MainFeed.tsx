import React, { useContext, useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { GET_FEED, GetFeedData, GetFeedVariables } from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../global_styles/Palette";
import {
    NetworkStatus,
    useApolloClient,
    useMutation,
    useQuery,
} from "@apollo/client";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { globalScreenStyles } from "../../../../../../global_styles/GlobalScreenStyles";
import { styles } from "./MainFeedStyles";
import {
    DONATE_TO_POST,
    DonateToPostData,
    DonateToPostVariables,
} from "../../../../../../global_building_blocks/post/gql/Mutations";
import {
    localFirstName,
    localUid,
} from "../../../../../../global_state/UserState";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../profile/gql/Queries";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../../../../global_constants/screen_constants";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../tutorial/context/tutorial_context/TutorialContext";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import { MainFeedNavProp } from "../../TabNavTypes";
import {
    useTutorialPosts,
    zariahPost,
} from "./hooks/tutorial_posts/tutorial_posts";
import { addNewReceipt } from "../../../../../../global_state/CoinUpdates";
import { createTimeout } from "../../../../../../global_utils/TimeoutUtils";
import CoinCountdown from "../../../../../../global_building_blocks/coin_countdown/CoinCountdown";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { addTransaction } from "../../../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";

const nextPostsReward = 80;

interface Props {
    navigation: MainFeedNavProp;
}

const MainFeed: React.FC<Props> = (props) => {
    const uid = localUid();

    const {
        openPost,
        openNew,
        openCommunity,
        openUser,
        openNewMessage,
        openReport,
        openConvo,
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

    const {
        tutorialActive,
        tutorialScreen,
        advanceTutorial,
        setScreen,
    } = useContext(TutorialContext);
    const tutPosts = useTutorialPosts();

    useEffect(() => {
        return props.navigation.addListener("focus", async () => {
            if (tutorialActive && tutorialScreen === TutorialScreen.PopToFeed) {
                await createTimeout(1000);

                for (const coin of [10, 10, 10, 10, 30, 80]) {
                    addNewReceipt(coin);
                    await createTimeout(80);
                }

                await createTimeout(1000);
                advanceTutorial();
            }
        });
    }, [tutorialActive, tutorialScreen]);

    const [lastFetchTime, setLastFetch] = useState<number>(Date.now());

    const finalFeed = tutorialActive
        ? tutPosts
        : !!data?.feed
        ? data.feed.filter((post) => !!post)
        : [];

    const userCoin = tutorialActive
        ? 400
        : !!selfData?.user
        ? selfData.user.coin
        : 0;

    const firstName = localFirstName();

    const userFirstName = tutorialActive
        ? firstName
        : !!selfData?.user
        ? selfData.user.firstName
        : firstName;

    useEffect(() => {
        setLastFetch(Date.now());
    }, [finalFeed.length]);

    const { cache } = useApolloClient();

    if (
        !tutorialActive &&
        ((!data?.feed && networkStatus === NetworkStatus.loading) ||
            (!selfData?.user && selfLoading))
    ) {
        return <LoadingWheel />;
    }

    if (!tutorialActive && error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!tutorialActive && selfError) {
        return <ErrorMessage refresh={selfRefetch} />;
    }

    return (
        <>
            <InstructionsModal
                navigate2Wallet={() =>
                    setTimeout(() => props.navigation.navigate("Wallet"), 700)
                }
                navToFirstConvo={() => {
                    setTimeout(() => {
                        openNewMessage(
                            zariahPost.user,
                            zariahPost.id,
                            zariahPost.responseCost
                        );
                        openConvo("tutConvo0", zariahPost.id);
                        setScreen(TutorialScreen.ExplainSuccess);
                    }, 700);
                }}
            />
            {finalFeed.length === 0 ? (
                <View style={styles.noFeedContainer}>
                    <Text style={styles.noFeedText}>
                        Follow some users or communities to start receiving a
                        feed!{"\n\n"}
                        You can still earn digicoin by viewing user or community
                        posts.
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
                    ListHeaderComponent={
                        SCREEN_LARGER_THAN_CONTENT ? (
                            <View style={globalScreenStyles.headerBuffer} />
                        ) : null
                    }
                    data={finalFeed}
                    renderItem={({ item }) => (
                        <Post
                            userCoin={userCoin}
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
                    keyExtractor={(item, index) =>
                        [item.id, "feed", index].join(":")
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={
                                networkStatus === NetworkStatus.refetch ||
                                stillSpin
                            }
                            onRefresh={() => {
                                setStillSpin(true);
                                setFetchMoreLen(0);
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
                                {finalFeed.length !== fetchMoreLen &&
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
                                    />
                                ) : (
                                    <View style={styles.noFeedContainer}>
                                        <Text style={styles.noFeedText}>
                                            Your feed is all out of posts!
                                            {"\n\n"}
                                            Follow more users or communities to
                                            receive more posts in your feed.
                                            {"\n\n"}
                                            You can still earn digicoin by
                                            viewing user or community posts.
                                        </Text>
                                    </View>
                                )}
                                <View
                                    style={globalScreenStyles.listFooterBuffer}
                                />
                            </>
                        );
                    }}
                />
            )}
            <NewButton openNew={openNew} />
        </>
    );
};

export default MainFeed;
