import * as React from "react";
import { Animated, View } from "react-native";
import StatsHeader from "./building_blocks/stats_header/StatsHeader";
import { UserType } from "../../../../../../../global_types/UserTypes";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";

interface Props {
    user: UserType;
    routeKey: string
}

const UserStats: React.FC<Props> = ({ user, routeKey }) => {
    const scrollPropsAndRef = useCollapsibleScene(routeKey);
    return (
        <Animated.FlatList
            bounces={false}
            ListHeaderComponent={<StatsHeader user={user} />}
            data={[]}
            renderItem={() => <View/>}
            {...scrollPropsAndRef}
        />
    );
};

export default UserStats;
