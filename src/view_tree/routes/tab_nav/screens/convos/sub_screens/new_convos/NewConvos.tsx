import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_USER_CONVOS } from "../../../profile/sub_screens/user_convos/gql/Queries";
import LoadingWheel from "../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import ConvoCover from "../../../../../../../global_building_blocks/convo_cover/ConvoCover";
import { palette } from "../../../../../../../global_styles/Palette";
import { ConvoCoverType } from "../../../../../../../global_types/ConvoCoverTypes";
import { GET_NEW_CONVOS } from "./gql/Queries";

interface Props {}

interface QueryData {
    getNewConvos: ConvoCoverType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const NewConvos: React.FC<Props> = () => {
    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_NEW_CONVOS, {
        variables: { uid: "snoot" },
        notifyOnNetworkStatusChange: true,
    });

    console.log(data?.getNewConvos.length, error, networkStatus, refetch);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.getNewConvos && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <View style={basicLayouts.flexGrid1}>
            <FlatList
                data={data?.getNewConvos}
                renderItem={({ item }) => <ConvoCover convoCover={item} />}
                keyExtractor={(item, index) =>
                    [item.id, "newConv", index].join(":")
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
        </View>
    );
};

export default NewConvos;
