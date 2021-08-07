import React from "react";
import { ScrollView, Text, View } from "react-native";
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
import { LevelTaskType } from "../../../../global_types/LevelTypes";

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
        return (
            <ScrollView style={styles.outerContainer}>
                <View style={styles.bubbleContainer}>
                    <View style={styles.bubbleTitleContainer}>
                        <Text style={styles.tasksTitle}>Tasks</Text>
                    </View>
                    <LevelTaskComp
                        task={{
                            task: LevelTaskType.BuyBolts,
                            quantity: 100,
                        }}
                        user={data?.user}
                    />
                    <LevelTaskComp
                        task={{
                            task: LevelTaskType.BuyBolts,
                            quantity: 1000,
                        }}
                        user={data?.user}
                    />
                    <LevelTaskComp
                        task={{
                            task: LevelTaskType.BuyBolts,
                            quantity: 100,
                        }}
                        user={data?.user}
                    />
                </View>
                <View style={styles.bubbleContainer}>
                    <View style={styles.bubbleTitleContainer}>
                        <Text style={styles.rewardsTitle}>Rewards</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    return <LoadingWheel />;
};

export default LevelUp;
