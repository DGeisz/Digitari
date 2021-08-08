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
import {
    calculateLevel,
    selectThreeTasks,
} from "../../../../global_types/LevelTypes";
import LevelRewardComp from "./building_blocks/level_reward_comp/LevelRewardComp";
import LockBuySelect from "../shop/building_blocks/lock_buy_select/LockBuySelect";
import { globalScreenStyles } from "../../../../global_styles/GlobalScreenStyles";
import { levelTasksComplete } from "./utils/task_progress_utils";

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

    useEffect(() => {
        console.log(selectThreeTasks(15));
    }, []);

    if (loading) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.user) {
        const level = calculateLevel(22);

        const tasksComplete = levelTasksComplete(level, data.user);

        return (
            <ScrollView style={styles.outerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.levelTitle}>Level {level.level}</Text>
                </View>
                <View style={styles.bubbleContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.bubbleTitle}>Tasks</Text>
                    </View>
                    {level.tasks.map((task, index) => (
                        <LevelTaskComp
                            task={task}
                            user={data?.user}
                            key={`task${index}`}
                        />
                    ))}
                </View>
                <View style={styles.bubbleContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.bubbleTitle}>Rewards</Text>
                    </View>
                    <Animated.View style={styles.rewardsContainer}>
                        {level.rewards.map((reward, index) => (
                            <LevelRewardComp
                                reward={reward}
                                index={index}
                                key={`level${index}`}
                            />
                        ))}
                    </Animated.View>
                </View>
                <LockBuySelect
                    alreadyOwns={false}
                    purchaseTitle={"Level Up"}
                    userBolts={2000}
                    forceLock={tasksComplete}
                    lockedMessage={
                        !tasksComplete
                            ? "You need to complete all the tasks!"
                            : undefined
                    }
                    description={"level up"}
                    onConfirm={() => {}}
                    price={level.cost}
                    onSelect={() => {}}
                />
                <View style={globalScreenStyles.listFooterBuffer} />
            </ScrollView>
        );
    }

    return <LoadingWheel />;
};

export default LevelUp;
