import * as React from "react";
import { View } from "react-native";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import StatsHeader from "./building_blocks/stats_header/StatsHeader";
import { UserType } from "../../../../../../../global_types/UserTypes";

interface Props {
    user: UserType;
}

const UserStats: React.FC<Props> = ({ user }) => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <StatsHeader user={user} />
        </View>
    );
};

export default UserStats;
