import * as React from "react";
import { Animated, View } from "react-native";
import StatsHeader from "./building_blocks/stats_header/StatsHeader";
import { UserType } from "../../../../../../../global_types/UserTypes";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { palette } from "../../../../../../../global_styles/Palette";
import Divider from "../../../../../../../global_building_blocks/divider/Divider";
import UserStat from "./building_blocks/user_stat/UserStat";
import { styles } from "./UserStatsStyles";

interface Props {
    user: UserType;
    routeKey: string;
}

const UserStats: React.FC<Props> = ({ user, routeKey }) => {
    const scrollPropsAndRef = useCollapsibleScene(routeKey);
    return (
        <Animated.ScrollView
            style={{ backgroundColor: palette.white }}
            {...scrollPropsAndRef}
        >
            <StatsHeader user={user} />
            <Divider />
            <View style={styles.statsContainer}>
                <UserStat
                    title={"Digicoin spent"}
                    quantity={user.coinSpent}
                    showCoin
                />
                <UserStat
                    title={"Digicoin donated to other posts"}
                    quantity={user.donated2Other}
                    showCoin
                />
                <UserStat
                    title={"Digicoin received through post donations"}
                    quantity={user.donated2User}
                    showCoin
                />
                <UserStat title={"Posts"} quantity={user.postCount} />
                <UserStat
                    title={"Responses to other posts"}
                    quantity={user.responses2Other}
                />
                <UserStat
                    title={"Responses received"}
                    quantity={user.responses2User}
                />
                <UserStat
                    title={"Communities Created"}
                    quantity={user.comsCreated}
                />
            </View>
        </Animated.ScrollView>
    );
};

export default UserStats;
