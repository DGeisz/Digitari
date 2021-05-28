import React, { useState } from "react";
import { Animated, RefreshControl, Text, View } from "react-native";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
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
import { basicLayouts } from "../../../global_styles/BasicLayouts";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../global_constants/screen_constants";

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
            uid: localUid(),
        },
    });

    const [donateToPost] = useMutation<DonateToPostData, DonateToPostVariables>(
        DONATE_TO_POST
    );

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    const finalFeed = !!data?.userPosts
        ? data.userPosts.filter((post) => !!post)
        : [];

    const userCoin = !!selfData?.user ? selfData.user.coin : 0;
    const userFirstName = !!selfData?.user ? selfData.user.firstName : "";

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            ListHeaderComponent={() => {
                if (
                    !data?.userPosts &&
                    networkStatus === NetworkStatus.loading
                ) {
                    return <LoadingWheel />;
                }

                if (error) {
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
                        setFetchMoreLen(0);
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
