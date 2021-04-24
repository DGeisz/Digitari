import React, { useContext, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { GET_FEED, GetFeedData, GetFeedVariables } from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../global_styles/Palette";
import { NetworkStatus, useQuery } from "@apollo/client";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { globalScreenStyles } from "../../../../../../global_styles/GlobalScreenStyles";

interface Props {}

const MainFeed: React.FC<Props> = () => {
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

    // console.log(data, error);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (!data?.feed && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    console.log(error);

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const finalFeed = !!data?.feed ? data.feed.filter((post) => !!post) : [];

    console.log(finalFeed.length);

    return (
        <>
            <FlatList
                data={finalFeed}
                renderItem={({ item }) => (
                    <Post
                        openUser={openUser}
                        openCommunity={openCommunity}
                        openPost={openPost}
                        onMessage={openNewMessage}
                        post={item}
                    />
                )}
                keyExtractor={(item, index) =>
                    [item.id, "feed", index].join(":")
                }
                refreshControl={
                    <RefreshControl
                        refreshing={
                            networkStatus === NetworkStatus.refetch || stillSpin
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
                        const lastTime = finalFeed[finalFeed.length - 1].time;
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
            <NewButton openNew={openNew} />
        </>
    );
};

export default MainFeed;
