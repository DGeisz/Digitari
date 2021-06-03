import React, { useContext, useState } from "react";
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
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
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
import { TutorialContext } from "../../../../../context/tutorial_context/TutorialContext";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import { MainFeedNavProp } from "../../TabNavTypes";
import { tutorialPosts } from "./hooks/tutorial_posts/tutorial_posts";

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

    const { tutorialActive } = useContext(TutorialContext);

    const tutPosts = tutorialPosts();

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

    return (
        <>
            <InstructionsModal
                navigate2Wallet={() =>
                    setTimeout(() => props.navigation.navigate("Wallet"), 700)
                }
            />
            {finalFeed.length === 0 ? (
                <View style={styles.noFeedContainer}>
                    <Text style={styles.noFeedText}>
                        Follow some users or communities to start receiving a
                        feed!
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
                            feedPost={true}
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
                    onEndReached={async () => {
                        if (finalFeed.length > fetchMoreLen) {
                            const lastTime =
                                finalFeed[finalFeed.length - 1].time;
                            const ffLen = finalFeed.length;

                            setFetchMoreLen(ffLen);

                            !!fetchMore &&
                                (await fetchMore({
                                    variables: {
                                        lastTime,
                                    },
                                }));
                        }
                    }}
                    ListFooterComponent={() => {
                        return networkStatus === NetworkStatus.fetchMore ? (
                            <LoadingWheel />
                        ) : (
                            <View style={globalScreenStyles.listFooterBuffer} />
                        );
                    }}
                />
            )}
            <NewButton openNew={openNew} />
        </>
    );
};

export default MainFeed;
