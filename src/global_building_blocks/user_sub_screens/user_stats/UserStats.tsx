import React, { useContext, useState } from "react";
import { Animated, RefreshControl, View } from "react-native";
import StatsHeader from "./building_blocks/stats_header/StatsHeader";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { UserType } from "../../../global_types/UserTypes";
import { palette } from "../../../global_styles/Palette";
import Divider from "../../divider/Divider";
import { styles } from "./UserStatsStyles";
import UserStat from "./building_blocks/user_stat/UserStat";
import { GENERAL_CONTENT_WIDTH } from "../../../global_constants/screen_constants";
import { UserContext } from "../user_context/UserContext";

const UserStats: React.FC = () => {
    const context = useContext(UserContext);

    const scrollPropsAndRef = useCollapsibleScene("UserStats");
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (!context.user) {
        return null;
    }

    return (
        <Animated.ScrollView
            {...scrollPropsAndRef}
            contentContainerStyle={{
                ...scrollPropsAndRef.contentContainerStyle,
                alignSelf: "center",
                width: GENERAL_CONTENT_WIDTH,
                backgroundColor: palette.white,
            }}
            refreshControl={
                <RefreshControl
                    refreshing={stillSpin}
                    onRefresh={() => {
                        setStillSpin(true);
                        !!context.refreshHeader && context.refreshHeader();
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
            <StatsHeader
                user={context.user}
                openFollows={context.openFollows}
            />
            <Divider />
            <View style={styles.statsContainer}>
                <UserStat
                    title={"Total digicoin spent"}
                    quantity={parseInt(context.user.coinSpent)}
                    showCoin
                />
                <UserStat
                    title={"Digicoin earned from posts"}
                    quantity={parseInt(context.user.receivedFromConvos)}
                    showCoin
                />
                <UserStat
                    title={"Digicoin spent on digibolts"}
                    quantity={parseInt(context.user.spentOnConvos)}
                    showCoin
                />
                <UserStat
                    title={"Posts created"}
                    quantity={context.user.postCount}
                />
            </View>
        </Animated.ScrollView>
    );
};

export default UserStats;
