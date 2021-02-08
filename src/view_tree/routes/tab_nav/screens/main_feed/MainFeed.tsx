import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { PostType } from "../../../../../global_types/PostTypes";
import { GET_FEED } from "./gql/Queries";
import LoadingWheel from "../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../global_styles/Palette";
import { localUid } from "../../../../../global_state/UserState";
import { NetworkStatus, useQuery } from "@apollo/client";
import { TabNavContext } from "../../TabNavContext";

interface Props {}

interface QueryData {
    feed: PostType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const MainFeed: React.FC<Props> = () => {
    const uid = localUid();

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_FEED, {
        variables: { uid: uid },
        notifyOnNetworkStatusChange: true,
    });

    // console.log(data?.feed.length, error, networkStatus, refetch);
    // console.log(data?.feed);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.feed && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <TabNavContext.Consumer>
            {({ openPost }) => (
                <View style={basicLayouts.flexGrid1}>
                    <FlatList
                        data={data?.feed}
                        renderItem={({ item }) => (
                            <Post post={item} onPress={openPost} />
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
                </View>
            )}
        </TabNavContext.Consumer>
    );

    // return <View/>;
};

export default MainFeed;
