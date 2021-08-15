import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
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
import { MaterialIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import { LevelUpNavProp } from "../../MainEntryNavTypes";
import { addTransaction } from "../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import { toCommaRep } from "../../../../global_utils/ValueRepUtils";
import {
    TransactionIcon,
    TransactionTypesEnum,
} from "../../../../global_types/TransactionTypes";

interface Props {
    navigation: LevelUpNavProp;
}

const LevelUp: React.FC<Props> = (props) => {
    const uid = localUid();

    const { data, loading, error, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        variables: {
            uid,
        },
    });

    const [_, setNav2Congrats] = useState<boolean>(false);

    const [levelUp] = useMutation<LevelUpData, LevelUpVariables>(LEVEL_UP, {
        update(cache, { data }) {
            if (!!data?.levelUp) {
                /*
                 * Update the user
                 */
                const newUser = data.levelUp;

                setNav2Congrats((last) => {
                    if (!last) {
                        props.navigation.replace("LevelCongrats", {
                            level: newUser.level,
                        });

                        const { rewards } = calculateLevel(newUser.level);
                        const coin = rewards[rewards.length - 1].quantity;

                        addTransaction(
                            {
                                tid: uid,
                                time: Date.now().toString(),
                                coin,
                                message: `You reached level ${toCommaRep(
                                    newUser.level
                                )}`,
                                transactionType: TransactionTypesEnum.Challenge,
                                transactionIcon: TransactionIcon.Challenge,
                                data: "",
                            },
                            cache
                        );
                    }

                    return true;
                });

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
                            return true;
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
                    <MaterialIcons
                        name={"bolt"}
                        color={palette.deepBlue}
                        size={27}
                    />
                    <Text style={styles.levelTitle}>
                        Reach Level {level.level}
                    </Text>
                    <MaterialIcons
                        name={"bolt"}
                        color={palette.deepBlue}
                        size={27}
                    />
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
                    <View style={styles.rewardsContainer}>
                        {level.rewards.map((reward, index) => (
                            <LevelRewardComp
                                reward={reward}
                                index={index}
                                key={`level${index}`}
                                scale={1.1}
                            />
                        ))}
                    </View>
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
