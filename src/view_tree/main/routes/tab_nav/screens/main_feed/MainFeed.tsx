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
import { localUid } from "../../../../../../global_state/UserState";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../profile/gql/Queries";

interface Props {}

const MainFeed: React.FC<Props> = () => {
    const uid = localUid();

    const {
        openPost,
        openNew,
        openCommunity,
        openUser,
        openNewMessage,
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

    // console.log(data, error);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    const [stillSpin, setStillSpin] = useState<boolean>(false);

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

    const finalFeed = !!data?.feed ? data.feed.filter((post) => !!post) : [];
    const userCoin = !!selfData?.user ? selfData.user.coin : 0;
    const userFirstName = !!selfData?.user ? selfData.user.firstName : "";

    return (
        <>
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
