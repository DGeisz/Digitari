import React, { useContext, useState } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    StyleSheet,
    ScrollView,
} from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import {
    postExampleNoLink,
    PostType,
} from "../../../../../../global_types/PostTypes";
import { GET_FEED, GetFeedData, GetFeedVariables } from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../global_styles/Palette";
import { localUid } from "../../../../../../global_state/UserState";
import { NetworkStatus, useQuery } from "@apollo/client";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";

interface Props {}

const MainFeed: React.FC<Props> = () => {
    const { openPost, openConvo, openNew, openNewMessage } = useContext(
        TabNavContext
    );

    const { data, error, networkStatus, refetch } = useQuery<
        GetFeedData,
        GetFeedVariables
    >(GET_FEED, {
        notifyOnNetworkStatusChange: true,
    });

    console.log(data, error);

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (!data?.feed && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    // const finalFeed = !!data?.feed ? data.feed.filter(post => )

    return (
        <>
            <FlatList
                data={data?.feed.filter((post) => !!post)}
                renderItem={({ item }) => (
                    <Post
                        post={item}
                        onPress={openPost}
                        onMessage={openNewMessage}
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
            />
            <NewButton openNew={openNew} />
        </>
    );
};

export default MainFeed;
