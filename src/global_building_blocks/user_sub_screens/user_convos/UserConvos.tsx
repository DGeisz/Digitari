import * as React from "react";
import { Animated, FlatList, RefreshControl, View } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_USER_CONVOS } from "./gql/Queries";
import { ConvoCoverType } from "../../../global_types/ConvoCoverTypes";
import { localUid } from "../../../global_state/UserState";
import { TabNavContext } from "../../../view_tree/main/routes/tab_nav/TabNavContext";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import LoadingWheel from "../../loading_wheel/LoadingWheel";
import ErrorMessage from "../../error_message/ErrorMessage";
import { palette } from "../../../global_styles/Palette";
import ConvoCover from "../../convo_cover/ConvoCover";

interface Props {
    routeKey: string;
    uid: string;
}

interface QueryData {
    userConvos: ConvoCoverType[];
}

interface QueryVariables {
    uid: string;
    lastTime?: number;
}

const UserConvos: React.FC<Props> = (props) => {
    const { openConvo } = React.useContext(TabNavContext);

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_USER_CONVOS, {
        variables: { uid: props.uid },
        notifyOnNetworkStatusChange: true,
    });

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.userConvos && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            data={data?.userConvos}
            renderItem={({ item }) => (
                <ConvoCover
                    convoCover={item}
                    openConvo={openConvo}
                    showUnViewedDot={false}
                />
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
