import React, { useContext, useState } from "react";
import { Animated, RefreshControl } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_USER_POSTS } from "./gql/Queries";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { PostType } from "../../../global_types/PostTypes";
import { localUid } from "../../../global_state/UserState";
import { TabNavContext } from "../../../view_tree/main/routes/tab_nav/TabNavContext";
import LoadingWheel from "../../loading_wheel/LoadingWheel";
import ErrorMessage from "../../error_message/ErrorMessage";
import Post from "../../post/Post";
import { palette } from "../../../global_styles/Palette";

interface Props {
    routeKey: string;
    uid: string;
}

interface QueryData {
    userPosts: PostType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const UserPosts: React.FC<Props> = (props) => {
    const { openConvo, openPost } = useContext(TabNavContext);

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_USER_POSTS, {
        variables: { uid: props.uid },
        notifyOnNetworkStatusChange: true,
    });

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (!data?.userPosts && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
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
    );
};

export default UserPosts;
