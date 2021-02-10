import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { PostType } from "../../../../../../global_types/PostTypes";
import { GET_FEED } from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../global_styles/Palette";
import { localUid } from "../../../../../../global_state/UserState";
import { NetworkStatus, useQuery } from "@apollo/client";
import { TabNavContext } from "../../TabNavContext";
import CancelConfirmModal from "../../../../../../global_building_blocks/cancel_confirm_modal/CancelConfirmModal";

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

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.feed && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <TabNavContext.Consumer>
            {({ openPost, openConvo, openNewMessage }) => (
                <View style={basicLayouts.flexGrid1}>
                    <FlatList
                        data={data?.feed}
                        renderItem={({ item }) => (
                            <Post
                                post={item}
                                onPress={openPost}
                                openConvo={openConvo}
                                onMessage={openNewMessage}
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
};

export default MainFeed;
