import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import ConvoMsg from "../../../../../global_building_blocks/convo_msg/ConvoMsg";
import { convoMsgExample } from "../../../../../global_types/ConvoMsgTypes";
import { PostType } from "../../../../../global_types/PostTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_FEED } from "./gql/Queries";
import LoadingWheel from "../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../global_styles/Palette";

interface Props {}

interface QueryData {
    getFeed: PostType[];
}

interface QueryVariables {
    id: string;
    lastTime?: number;
}

const MainFeed: React.FC<Props> = () => {
    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_FEED, {
    variables: {id: "snoot"},
        notifyOnNetworkStatusChange: true,
    });

    console.log(data?.getFeed.length, error, networkStatus, refetch);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.getFeed && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <View style={basicLayouts.flexGrid1}>
            <View style={basicLayouts.flexGrid4}>
                <FlatList
                    data={data?.getFeed}
                    renderItem={({ item }) => <Post post={item} />}
                    keyExtractor={(item, index) => [item.id, 'feed', index].join(':')}
                    refreshControl={<RefreshControl
                        refreshing={networkStatus === NetworkStatus.refetch || stillSpin}
                        onRefresh={() => {
                            setStillSpin(true);
                            refetch && refetch();
                            setTimeout(() => {
                                setStillSpin(false);
                            }, 1000);
                        }}
                        colors={[palette.deepBlue, palette.darkForestGreen, palette.oceanSurf]}
                        tintColor={palette.deepBlue}
                    />}
                />
            </View>
        </View>
    );
};

export default MainFeed;
