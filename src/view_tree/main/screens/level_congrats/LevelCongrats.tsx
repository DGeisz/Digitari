import React from "react";
import { View, Text } from "react-native";
import { styles } from "./LevelCongratsStyles";
import { LevelCongratsRouteProp } from "../../MainEntryNavTypes";
import { toCommaRep } from "../../../../global_utils/ValueRepUtils";
import { calculateLevel } from "../../../../global_types/LevelTypes";
import LevelRewardComp from "../level_up/building_blocks/level_reward_comp/LevelRewardComp";

interface Props {
    route: LevelCongratsRouteProp;
}

const LevelCongrats: React.FC<Props> = (props) => {
    const { level } = props.route.params;

    const { rewards } = calculateLevel(level);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.confettiContainer}>🎉</Text>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        You reached level {toCommaRep(level)}!
                    </Text>
                </View>
                <Text style={styles.confettiContainer}>🎉</Text>
            </View>
            <Text style={styles.rewardsTitle}>Rewards</Text>
            <View style={styles.rewardsContainer}>
                {rewards.map((reward, index) => (
                    <LevelRewardComp
                        reward={reward}
                        index={index}
                        key={`level${index}`}
                        scale={1.2}
                    />
                ))}
            </View>
        </View>
    );
};

export default LevelCongrats;
