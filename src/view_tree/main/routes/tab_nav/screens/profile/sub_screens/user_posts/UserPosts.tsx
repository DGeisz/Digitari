import * as React from "react";
import { FlatList, Animated, RefreshControl, View } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";
import Post from "../../../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../../../global_styles/Palette";
import { PostType } from "../../../../../../../../global_types/PostTypes";
import { GET_USER_POSTS } from "./gql/Queries";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { localUid } from "../../../../../../../../global_state/UserState";
import { TabNavContext } from "../../../../TabNavContext";

interface Props {
    routeKey: string;
}

interface QueryData {
    userPosts: PostType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const UserPosts: React.FC<Props> = ({ routeKey }) => {
    const uid = localUid();

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_USER_POSTS, {
        variables: { uid: uid },
        notifyOnNetworkStatusChange: true,
    });

    const scrollPropsAndRef = useCollapsibleScene(routeKey);
    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.userPosts && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <TabNavContext.Consumer>
            {({ openConvo, openPost }) => (
                <Animated.FlatList
                    {...scrollPropsAndRef}
                    data={data?.userPosts}
                    renderItem={({ item }) => (
                        <Post
                            post={item}
                            onPress={openPost}
                            openConvo={openConvo}
                            showFooter={false}
                        />
                    )}
                    keyExtractor={(item, index) =>
                        [item.id, "userPosts", index].join(":")
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={
                                networkStatus === NetworkStatus.refetch ||
                                stillSpin
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
            )}
        </TabNavContext.Consumer>
    );
};

export default UserPosts;