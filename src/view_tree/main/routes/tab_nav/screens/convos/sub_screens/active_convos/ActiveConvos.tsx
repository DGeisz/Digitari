import React, { useContext, useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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
import { styles } from "./ActiveConvosStyles";
import { localUid } from "../../../../../../../../global_state/UserState";
import { ConvosContext } from "../../ConvosContext";

const ActiveConvos: React.FC = () => {
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

    let anyUnViewedConvos = false;

    if (finalFeed.length > 0) {
        anyUnViewedConvos = finalFeed.some((convo) =>
            convo.tid === uid ? !convo.tviewed : !convo.sviewed
        );
    }

    const { setActiveConvosViewed } = useContext(ConvosContext);

    useEffect(() => {
        setActiveConvosViewed(!anyUnViewedConvos);
    }, [anyUnViewedConvos]);

    if (
        networkStatus === NetworkStatus.loading ||
        networkStatus === NetworkStatus.setVariables
    ) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (finalFeed.length === 0) {
        return (
            <View style={styles.noActiveConvos}>
                <Text style={styles.noActiveConvosText}>
                    Respond to posts to start convos!
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        !!refetch && refetch();
                    }}
                >
                    <Text style={styles.refreshText}>Refresh</Text>
                </TouchableOpacity>
            </View>
        );
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
