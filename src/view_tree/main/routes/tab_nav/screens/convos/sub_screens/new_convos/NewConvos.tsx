import React, { useContext, useEffect, useRef, useState } from "react";
import { styles } from "./NewConvosStyles";
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../../../global_building_blocks/error_message/ErrorMessage";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";
import ConvoCover from "../../../../../../../../global_building_blocks/convo_cover/ConvoCover";
import { palette } from "../../../../../../../../global_styles/Palette";
import { TabNavContext } from "../../../../TabNavContext";
import {
    NEW_CONVOS,
    NEW_CONVOS_PER_PAGE,
    NewConvosData,
    NewConvosVariables,
} from "./gql/Queries";
import { ConvoOrder } from "../../../../../../../../global_types/ConvoTypes";
import { globalScreenStyles } from "../../../../../../../../global_styles/GlobalScreenStyles";
import { useScrollToTopOnPress } from "../../../../hooks/ScrollToTop";
import { NewConvosNavProp } from "../../ConvosNavTypes";

interface Props {
    navigation: NewConvosNavProp;
}

const NewConvos: React.FC<Props> = (props) => {
    const [orderType, setOrder] = useState<ConvoOrder>(ConvoOrder.ranking);

    const { openConvo, convosScrollIndex } = useContext(TabNavContext);
    const listRef = useRef<FlatList>(null);

    useScrollToTopOnPress(convosScrollIndex, props.navigation, listRef);

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        NewConvosData,
        NewConvosVariables
    >(NEW_CONVOS, {
        variables: {
            orderingType: orderType,
        },
        notifyOnNetworkStatusChange: true,
    });

    const [stillSpin, setStillSpin] = useState<boolean>(false);
    /*
     * The query*/
    const [fetchMoreLen, setFetchMoreLen] = useState<number>(
        NEW_CONVOS_PER_PAGE - 5
    );

    useEffect(() => {
        setFetchMoreLen(0);
    }, [orderType]);

    const finalFeed = !!data?.newConvos ? data.newConvos : [];

    return (
        <View style={basicLayouts.flexGrid1}>
            <View style={styles.orderOptionContainer}>
                <Text style={styles.orderByTitle}>Order By</Text>
                <View style={styles.orderOptionBar}>
                    <TouchableOpacity
                        style={[
                            styles.orderOption,
                            orderType === ConvoOrder.ranking
                                ? { backgroundColor: palette.deepBlue }
                                : {},
                        ]}
                        onPress={() => setOrder(ConvoOrder.ranking)}
                    >
                        <Text
                            style={[
                                styles.orderOptionText,
                                orderType === ConvoOrder.ranking
                                    ? { color: palette.white }
                                    : {},
                            ]}
                        >
                            Tier
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.orderOption,
                            orderType === ConvoOrder.time
                                ? { backgroundColor: palette.deepBlue }
                                : {},
                        ]}
                        onPress={() => setOrder(ConvoOrder.time)}
                    >
                        <Text
                            style={[
                                styles.orderOptionText,
                                orderType === ConvoOrder.time
                                    ? { color: palette.white }
                                    : {},
                            ]}
                        >
                            Time
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {!data?.newConvos &&
            (networkStatus === NetworkStatus.loading ||
                networkStatus === NetworkStatus.refetch ||
                networkStatus === NetworkStatus.setVariables) ? (
                <LoadingWheel />
            ) : !!error ? (
                <ErrorMessage refresh={refetch} />
            ) : finalFeed.length === 0 ? (
                <View style={styles.noNewConvos}>
                    <Text style={styles.noNewConvosText}>
                        Create posts to get responses!
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            !!refetch && refetch();
                        }}
                    >
                        <Text style={styles.refreshText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    ref={listRef}
                    data={finalFeed}
                    renderItem={({ item, index }) => (
                        <ConvoCover
                            convo={item}
                            openConvo={openConvo}
                            displayActive={false}
                            showBottomBorder={index !== finalFeed.length - 1}
                        />
                    )}
                    keyExtractor={(item, index) =>
                        [item.id, "newConv", index].join(":")
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
                    onEndReached={async () => {
                        if (finalFeed.length > fetchMoreLen) {
                            const ffLen = finalFeed.length;

                            setFetchMoreLen(ffLen);

                            !!fetchMore &&
                                (await fetchMore({
                                    variables: {
                                        orderingType: orderType,
                                        offset: ffLen,
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
            )}
        </View>
    );
};

export default NewConvos;
