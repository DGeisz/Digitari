import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import ConvoMsg from "../../../../../../../global_building_blocks/convo_msg/ConvoMsg";
import { convoMsgExample } from "../../../../../../../global_types/ConvoMsgTypes";
import { localUid } from "../../../../../../../global_state/UserState";
import { NetworkStatus, useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { ConvoCoverType } from "../../../../../../../global_types/ConvoCoverTypes";
import { GET_ACTIVE_CONVOS } from "./gql/Queries";
import ConvoCover from "../../../../../../../global_building_blocks/convo_cover/ConvoCover";
import { palette } from "../../../../../../../global_styles/Palette";
import { TabNavContext } from "../../../../TabNavContext";

interface Props {}

interface QueryData {
    activeConvos: ConvoCoverType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const ActiveConvos: React.FC<Props> = () => {
    const uid = localUid();

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_ACTIVE_CONVOS, {
        variables: { uid: uid },
        notifyOnNetworkStatusChange: true,
    });

    console.log(data?.activeConvos.length, error, networkStatus, refetch);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.activeConvos && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <TabNavContext.Consumer>
            {({ openConvo }) => (
                <View style={basicLayouts.flexGrid1}>
                    <FlatList
                        data={data?.activeConvos}
                        renderItem={({ item }) => (
                            <ConvoCover
                                convoCover={item}
                                openConvo={openConvo}
                            />
                        )}
                        keyExtractor={(item, index) =>
                            [item.id, "aConv", index].join(":")
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

export default ActiveConvos;
