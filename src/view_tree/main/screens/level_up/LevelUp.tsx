import React from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { styles } from "./LevelUpStyles";
import LevelTaskComp from "./building_blocks/level_task/LevelTask";
import { useMutation, useQuery } from "@apollo/client";
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
import LockBuySelect from "../shop/building_blocks/lock_buy_select/LockBuySelect";
import { globalScreenStyles } from "../../../../global_styles/GlobalScreenStyles";
import { applyRewards, levelTasksComplete } from "./utils/task_progress_utils";
import { LEVEL_UP, LevelUpData, LevelUpVariables } from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";

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

    const [levelUp] = useMutation<LevelUpData, LevelUpVariables>(LEVEL_UP, {
        update(cache, { data }) {
            if (!!data?.levelUp) {
                /*
                 * Update the user
                 */
                const newUser = data.levelUp;

                /*
                 * This is probably unnecessary, but I just
                 * need to ensure we got it right
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        level() {
                            return newUser.level;
                        },
                        bolts() {
                            return newUser.bolts;
                        },
                        newTransactionUpdate() {
                            return newUser.newTransactionUpdate;
                        },
                        transTotal() {
                            return newUser.transTotal;
                        },
                        maxFollowers() {
                            return newUser.maxFollowers;
                        },
                        maxFollowing() {
                            return newUser.maxFollowing;
                        },
                        maxPostRecipients() {
                            return newUser.maxPostRecipients;
                        },
                        remainingInvites() {
                            return newUser.remainingInvites;
                        },

                        levelUsersFollowed() {
                            return newUser.levelUsersFollowed;
                        },
                        levelsCommsFollowed() {
                            return newUser.levelsCommsFollowed;
                        },
                        levelCoinCollected() {
                            return newUser.levelCoinCollected;
                        },
                        levelPostsCreated() {
                            return newUser.levelPostsCreated;
                        },
                        levelPostBoltsBought() {
                            return newUser.levelPostBoltsBought;
                        },
                        levelInvitedAndJoined() {
                            return newUser.levelInvitedAndJoined;
                        },
                        levelNewResponses() {
                            return newUser.levelNewResponses;
                        },
                        levelSuccessfulConvos() {
                            return newUser.levelSuccessfulConvos;
                        },
                        levelCommsCreated() {
                            return newUser.levelCommsCreated;
                        },
                        levelCoinSpentOnPosts() {
                            return newUser.levelCoinSpentOnPosts;
                        },
                        levelCoinEarnedFromPosts() {
                            return newUser.levelCoinEarnedFromPosts;
                        },
                    },
                });
            }
        },
    });

    if (loading) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.user) {
        const level = calculateLevel(data.user.level + 1);

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
                    userBolts={parseInt(data.user.bolts)}
                    forceLock={!tasksComplete}
                    lockedMessage={
                        !tasksComplete
                            ? "You need to complete all the tasks!"
                            : undefined
                    }
                    description={"level up"}
                    onConfirm={async () => {
                        try {
                            await levelUp({
                                optimisticResponse: {
                                    levelUp: applyRewards(level, data?.user),
                                },
                            });
                        } catch (e) {
                            if (__DEV__) {
                                console.log("Level up error: ", e);
                            }
                        }
                    }}
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
