import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { styles } from "./LevelUpStyles";
import LevelTaskComp from "./building_blocks/level_task/LevelTask";
import { useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../routes/tab_nav/screens/profile/gql/Queries";
import { localUid } from "../../../../global_state/UserState";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { calculateLevel } from "../../../../global_types/LevelTypes";
import LevelRewardComp from "./building_blocks/level_reward_comp/LevelRewardComp";

const LevelUp: React.FC = () => {
    const uid = localUid();

    const { data, loading, error, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        variables: {
            uid,
        },
    });

    if (loading) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.user) {
        const level = calculateLevel(10);

        return (
            <ScrollView style={styles.outerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.levelTitle}>Level {level.level}</Text>
                </View>
                <View style={styles.bubbleContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.bubbleTitle}>Tasks</Text>
                    </View>
                    {level.tasks.map((task) => (
                        <LevelTaskComp task={task} user={data?.user} />
                    ))}
                </View>
                <View style={styles.bubbleContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.bubbleTitle}>Rewards</Text>
                    </View>
                    <Animated.View style={styles.rewardsContainer}>
                        {level.rewards.map((reward) => (
                            <LevelRewardComp reward={reward} />
                        ))}
                    </Animated.View>
                </View>
                <Text>{level.cost}</Text>
            </ScrollView>
        );
    }

    return <LoadingWheel />;
};

export default LevelUp;
