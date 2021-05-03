import React, { useState } from "react";
import { Animated, RefreshControl, View } from "react-native";
import StatsHeader from "./building_blocks/stats_header/StatsHeader";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import UserStat from "./building_blocks/user_stat/UserStat";
import { styles } from "./UserStatsStyles";
import { UserType } from "../../../global_types/UserTypes";
import { palette } from "../../../global_styles/Palette";
import Divider from "../../divider/Divider";
import { NetworkStatus } from "@apollo/client";

interface Props {
    user: UserType;
    routeKey: string;
    refreshHeader: () => void;
}

const UserStats: React.FC<Props> = (props) => {
    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);
    return (
        <Animated.ScrollView
            style={{ backgroundColor: palette.white }}
            {...scrollPropsAndRef}
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
        >
            <StatsHeader user={props.user} />
            <Divider />
            {/*<View style={styles.statsContainer}>*/}
            {/*    <UserStat*/}
            {/*        title={"Digicoin spent"}*/}
            {/*        quantity={props.user.coinSpent}*/}
            {/*        showCoin*/}
            {/*    />*/}
            {/*    <UserStat*/}
            {/*        title={"Digicoin donated to other posts"}*/}
            {/*        quantity={props.user.donated2Other}*/}
            {/*        showCoin*/}
            {/*    />*/}
            {/*    <UserStat*/}
            {/*        title={"Digicoin received through post donations"}*/}
            {/*        quantity={props.user.donated2User}*/}
            {/*        showCoin*/}
            {/*    />*/}
            {/*    <UserStat title={"Posts"} quantity={props.user.postCount} />*/}
            {/*    <UserStat*/}
            {/*        title={"Responses to other posts"}*/}
            {/*        quantity={props.user.responses2Other}*/}
            {/*    />*/}
            {/*    <UserStat*/}
            {/*        title={"Responses received"}*/}
            {/*        quantity={props.user.responses2User}*/}
            {/*    />*/}
            {/*    <UserStat*/}
            {/*        title={"Communities Created"}*/}
            {/*        quantity={props.user.comsCreated}*/}
            {/*    />*/}
            {/*</View>*/}
        </Animated.ScrollView>
    );
};

export default UserStats;
