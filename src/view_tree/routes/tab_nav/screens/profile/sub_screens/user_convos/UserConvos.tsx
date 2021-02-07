import * as React from "react";
import { Animated, FlatList, RefreshControl, View } from "react-native";
import { PostType } from "../../../../../../../global_types/PostTypes";
import { ConvoCoverType } from "../../../../../../../global_types/ConvoCoverTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_FEED } from "../../../main_feed/gql/Queries";
import LoadingWheel from "../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import Post from "../../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../../global_styles/Palette";
import { GET_USER_CONVOS } from "./gql/Queries";
import ConvoCover from "../../../../../../../global_building_blocks/convo_cover/ConvoCover";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { localUid } from "../../../../../../../global_state/UserState";

interface Props {
    routeKey: string;
}

interface QueryData {
    getUserConvos: ConvoCoverType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const UserConvos: React.FC<Props> = ({ routeKey }) => {
    const uid = localUid();

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_USER_CONVOS, {
        variables: { uid: uid },
        notifyOnNetworkStatusChange: true,
    });

    console.log(data?.getUserConvos.length, error, networkStatus, refetch);

    const scrollPropsAndRef = useCollapsibleScene(routeKey);
    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.getUserConvos && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            data={data?.getUserConvos}
            renderItem={({ item }) => (
                <ConvoCover convoCover={item} showUnViewedDot={false} />
            )}
            keyExtractor={(item, index) =>
                [item.id, "userConv", index].join(":")
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

export default UserConvos;
