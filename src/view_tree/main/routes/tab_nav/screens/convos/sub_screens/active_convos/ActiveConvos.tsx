import React, { useContext, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { localUid } from "../../../../../../../../global_state/UserState";
import { TabNavContext } from "../../../../TabNavContext";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    ACTIVE_CONVOS,
    ACTIVE_CONVOS_PER_PAGE,
    ActiveConvosData,
    ActiveConvosVariables,
} from "./gql/Queries";
import LoadingWheel from "../../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../../global_building_blocks/error_message/ErrorMessage";
import ConvoCover from "../../../../../../../../global_building_blocks/convo_cover/ConvoCover";
import { palette } from "../../../../../../../../global_styles/Palette";
import { globalScreenStyles } from "../../../../../../../../global_styles/GlobalScreenStyles";

interface Props {}

const ActiveConvos: React.FC<Props> = () => {
    const uid = localUid();

    const { openConvo } = useContext(TabNavContext);

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        ActiveConvosData,
        ActiveConvosVariables
    >(ACTIVE_CONVOS, {
        notifyOnNetworkStatusChange: true,
    });

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const finalFeed = !!data?.activeConvos ? data.activeConvos : [];
    const [fetchMoreLen, setFetchMoreLen] = useState<number>(
        ACTIVE_CONVOS_PER_PAGE - 1
    );

    if (
        networkStatus === NetworkStatus.loading ||
        networkStatus === NetworkStatus.setVariables
    ) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <FlatList
            data={finalFeed}
            renderItem={({ item, index }) => (
                <ConvoCover
                    convo={item}
                    openConvo={openConvo}
                    displayActive={true}
                    showBottomBorder={index !== finalFeed.length - 1}
                />
            )}
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
            onEndReached={async () => {
                if (finalFeed.length > fetchMoreLen) {
                    const ffLen = finalFeed.length;
                    const lastTime = finalFeed[ffLen - 1].lastTime;

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

export default ActiveConvos;
