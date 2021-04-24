import React, { useContext, useState } from "react";
import { Animated, RefreshControl, View } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    GET_USER_POSTS,
    GetUserPostsData,
    GetUserPostVariables,
} from "./gql/Queries";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { TabNavContext } from "../../../view_tree/main/routes/tab_nav/TabNavContext";
import LoadingWheel from "../../loading_wheel/LoadingWheel";
import ErrorMessage from "../../error_message/ErrorMessage";
import Post from "../../post/Post";
import { palette } from "../../../global_styles/Palette";
import { globalScreenStyles } from "../../../global_styles/GlobalScreenStyles";

interface Props {
    routeKey: string;
    uid: string;
    openPost: (pid: string) => void;
    openNewMessage: (tname: string, pid: string, responseCost: number) => void;
    openCommunity: (cmid: string) => void;
    openUser: (uid: string) => void;
}

const UserPosts: React.FC<Props> = (props) => {
    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        GetUserPostsData,
        GetUserPostVariables
    >(GET_USER_POSTS, {
        variables: { uid: props.uid },
        notifyOnNetworkStatusChange: true,
    });

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    if (!data?.userPosts && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    const finalFeed = !!data?.userPosts
        ? data.userPosts.filter((post) => !!post)
        : [];

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            data={finalFeed}
            renderItem={({ item }) => (
                <Post
                    openUser={props.openUser}
                    openCommunity={props.openCommunity}
                    openPost={props.openPost}
                    onMessage={props.openNewMessage}
                    post={item}
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
    );
};

export default UserPosts;
