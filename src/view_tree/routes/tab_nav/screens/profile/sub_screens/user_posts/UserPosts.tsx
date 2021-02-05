import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import Post from "../../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../../global_styles/Palette";
import { PostType } from "../../../../../../../global_types/PostTypes";
import { GET_USER_POSTS } from "./gql/Queries";

interface Props {}

interface QueryData {
    getUserPosts: PostType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const UserPosts: React.FC<Props> = () => {
    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
        >(GET_USER_POSTS, {
        variables: { uid: "snoot" },
        notifyOnNetworkStatusChange: true,
    });

    console.log(data?.getUserPosts.length, error, networkStatus, refetch);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.getUserPosts && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
            <FlatList
                ListHeaderComponent={<View onLayout={({nativeEvent: {layout: {height}}}) => {console.log("height: ", height)}}/>}
                onScroll={({nativeEvent: {contentOffset: {x, y}}}) => {
                    console.log("this is x, y", x, y);
                }}
                data={data?.getUserPosts}
                renderItem={({ item }) => <Post post={item} />}
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
    );
};

export default UserPosts;
