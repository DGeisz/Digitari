import React, { useState } from "react";
import { Animated, RefreshControl, Text, View } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    USER_CONVOS,
    USER_CONVOS_PER_PAGE,
    UserConvosData,
    UserConvosVariables,
} from "./gql/Queries";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import ConvoCover from "../../convo_cover/ConvoCover";
import { palette } from "../../../global_styles/Palette";
import LoadingWheel from "../../loading_wheel/LoadingWheel";
import { globalScreenStyles } from "../../../global_styles/GlobalScreenStyles";
import { styles } from "./UserConvosStyles";
import { localUid } from "../../../global_state/UserState";
import ErrorMessage from "../../error_message/ErrorMessage";

interface Props {
    routeKey: string;
    uid: string;
    openConvo: (cvid: string, pid: string) => void;
    refreshHeader: () => void;
}

const UserConvos: React.FC<Props> = (props) => {
    const myUid = localUid();

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        UserConvosData,
        UserConvosVariables
    >(USER_CONVOS, {
        variables: {
            uid: props.uid,
        },
        notifyOnNetworkStatusChange: true,
    });

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const finalFeed = !!data?.userConvos ? data.userConvos : [];

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(
        USER_CONVOS_PER_PAGE - 1
    );

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            data={finalFeed}
            ListHeaderComponent={() => {
                if (!!error) {
                    return <ErrorMessage refresh={refetch} />;
                } else if (networkStatus === NetworkStatus.loading) {
                    return <LoadingWheel />;
                } else if (finalFeed.length === 0) {
                    return (
                        <View style={styles.noUserConvos}>
                            <Text style={styles.noUserConvosText}>
                                {myUid === props.uid
                                    ? "You haven't had any convos"
                                    : "User hasn't had any public convos"}
                            </Text>
                        </View>
                    );
                } else {
                    return null;
                }
            }}
            renderItem={({ item, index }) => (
                <ConvoCover
                    displayActive={true}
                    convo={item}
                    showBottomBorder={index !== finalFeed.length - 1}
                    showUnViewedDot={false}
                    openConvo={props.openConvo}
                />
            )}
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        !!refetch && refetch();
                        !!props.refreshHeader && props.refreshHeader();
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

export default UserConvos;
