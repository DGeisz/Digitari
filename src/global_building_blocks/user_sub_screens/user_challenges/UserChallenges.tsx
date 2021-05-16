import React, { useEffect, useMemo, useState } from "react";
import { Animated, RefreshControl, View } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { UserType } from "../../../global_types/UserTypes";
import Challenge from "../../challenge/Challenge";
import { palette } from "../../../global_styles/Palette";
import { challenges } from "./data/challenges/challenges";
import { globalScreenStyles } from "../../../global_styles/GlobalScreenStyles";

interface Props {
    user: UserType;
    routeKey: string;
    refreshHeader: () => void;
}

const UserChallenges: React.FC<Props> = (props) => {
    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    return useMemo(() => {
        return (
            <Animated.FlatList
                {...scrollPropsAndRef}
                data={challenges}
                renderItem={({ item }) => (
                    <Challenge challenge={item} user={props.user} />
                )}
                keyExtractor={(_, index) =>
                    [props.user.id, "chlng", index].join(":")
                }
                refreshControl={
                    <RefreshControl
                        refreshing={stillSpin}
                        onRefresh={() => {
                            setStillSpin(true);
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
                ListFooterComponent={
                    <View style={globalScreenStyles.listFooterBuffer} />
                }
            />
        );
    }, [props.user]);
};

export default UserChallenges;
