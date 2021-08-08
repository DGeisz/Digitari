export enum LevelTaskType {
    FollowUsers,
    FollowComms,
    FollowUsersOrComms,
    CollectCoin,
    CreatePosts,
    BuyBolts,
    Invite,
    NewResponse,
    SuccessfulConvos,
    CreateCommunities,
    SpendCoinCreatingPosts,
    EarnCoinFromPosts,
    CreateProfilePic,
    CreateBio,
    CreateBioLink,
    UpgradeWallet,
    ConvoStreak,
}

export interface LevelTask {
    task: LevelTaskType;
    quantity: number;
}

export enum LevelRewardType {
    Coin,
    MaxFollowers,
    MaxFollowing,
    MaxPostRecipients,
    Invites,
    ProfilePic,
    Bio,
    ProfileLink,
}

export interface LevelReward {
    reward: LevelRewardType;
    quantity: number;
}

export interface Level {
    level: number;
    tasks: LevelTask[];
    rewards: LevelReward[];
    cost: number;
}

export function calculateLevel(level: number): Level {
    /*
     * Start off with the built in levels
     */
    switch (level) {
        case 1: {
            return {
                level: 1,
                tasks: [
                    {
                        task: LevelTaskType.FollowUsersOrComms,
                        quantity: 1,
                    },
                    {
                        task: LevelTaskType.CollectCoin,
                        quantity: 100,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxFollowing,
                        quantity: 4,
                    },
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 2,
                    },
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 2,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 800,
                    },
                ],
                cost: 30,
            };
        }
        case 2: {
            return {
                level: 2,
                tasks: [
                    {
                        task: LevelTaskType.FollowUsers,
                        quantity: 2,
                    },
                    {
                        task: LevelTaskType.FollowComms,
                        quantity: 1,
                    },
                    {
                        task: LevelTaskType.CreatePosts,
                        quantity: 1,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxFollowing,
                        quantity: 2,
                    },
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 3,
                    },
                    {
                        reward: LevelRewardType.Invites,
                        quantity: 10,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 800,
                    },
                ],
                cost: 70,
            };
        }
        case 3: {
            return {
                level: 3,
                tasks: [
                    {
                        task: LevelTaskType.BuyBolts,
                        quantity: 20,
                    },
                    {
                        task: LevelTaskType.Invite,
                        quantity: 3,
                    },
                    {
                        task: LevelTaskType.CreatePosts,
                        quantity: 2,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 7,
                    },
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 5,
                    },
                    {
                        reward: LevelRewardType.ProfilePic,
                        quantity: 1,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 800,
                    },
                ],
                cost: 80,
            };
        }
        case 4: {
            return {
                level: 4,
                tasks: [
                    {
                        task: LevelTaskType.NewResponse,
                        quantity: 4,
                    },
                    {
                        task: LevelTaskType.CreateProfilePic,
                        quantity: 1,
                    },
                    {
                        task: LevelTaskType.SuccessfulConvos,
                        quantity: 2,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxFollowing,
                        quantity: 4,
                    },
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 5,
                    },
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 10,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 800,
                    },
                ],
                cost: 100,
            };
        }
        case 5: {
            return {
                level: 5,
                tasks: [
                    {
                        task: LevelTaskType.CreateCommunities,
                        quantity: 1,
                    },
                    {
                        task: LevelTaskType.SpendCoinCreatingPosts,
                        quantity: 1200,
                    },
                    {
                        task: LevelTaskType.UpgradeWallet,
                        quantity: 1200,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 15,
                    },
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 15,
                    },
                    {
                        reward: LevelRewardType.Bio,
                        quantity: 1,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 1200,
                    },
                ],
                cost: 200,
            };
        }
        case 6: {
            return {
                level: 6,
                tasks: [
                    {
                        task: LevelTaskType.CreateBio,
                        quantity: 1,
                    },
                    {
                        task: LevelTaskType.ConvoStreak,
                        quantity: 10,
                    },
                    {
                        task: LevelTaskType.EarnCoinFromPosts,
                        quantity: 1000,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 20,
                    },
                    {
                        reward: LevelRewardType.MaxFollowing,
                        quantity: 10,
                    },
                    {
                        reward: LevelRewardType.Invites,
                        quantity: 15,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 1200,
                    },
                ],
                cost: 400,
            };
        }
        case 7: {
            return {
                level: 7,
                tasks: [
                    {
                        task: LevelTaskType.BuyBolts,
                        quantity: 80,
                    },
                    {
                        task: LevelTaskType.Invite,
                        quantity: 5,
                    },
                    {
                        task: LevelTaskType.FollowUsersOrComms,
                        quantity: 10,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 20,
                    },
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 20,
                    },
                    {
                        reward: LevelRewardType.MaxFollowing,
                        quantity: 10,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 1200,
                    },
                ],
                cost: 650,
            };
        }
        case 8: {
            return {
                level: 8,
                tasks: [
                    {
                        task: LevelTaskType.ConvoStreak,
                        quantity: 25,
                    },
                    {
                        task: LevelTaskType.UpgradeWallet,
                        quantity: 1900,
                    },
                    {
                        task: LevelTaskType.CollectCoin,
                        quantity: 5000,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 30,
                    },
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 40,
                    },
                    {
                        reward: LevelRewardType.ProfileLink,
                        quantity: 1,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 1900,
                    },
                ],
                cost: 800,
            };
        }
        case 9: {
            return {
                level: 9,
                tasks: [
                    {
                        task: LevelTaskType.CreateBioLink,
                        quantity: 1,
                    },
                    {
                        task: LevelTaskType.SpendCoinCreatingPosts,
                        quantity: 2000,
                    },
                    {
                        task: LevelTaskType.NewResponse,
                        quantity: 15,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 30,
                    },
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 30,
                    },
                    {
                        reward: LevelRewardType.MaxFollowing,
                        quantity: 5,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 1900,
                    },
                ],
                cost: 1000,
            };
        }
        /*TODO: change to 10*/
        default: {
            return {
                level: 10,
                tasks: [
                    {
                        task: LevelTaskType.ConvoStreak,
                        quantity: 40,
                    },
                    {
                        task: LevelTaskType.FollowUsersOrComms,
                        quantity: 5,
                    },
                    {
                        task: LevelTaskType.CreateCommunities,
                        quantity: 2,
                    },
                ],
                rewards: [
                    {
                        reward: LevelRewardType.MaxPostRecipients,
                        quantity: 40,
                    },
                    {
                        reward: LevelRewardType.MaxFollowers,
                        quantity: 50,
                    },
                    {
                        reward: LevelRewardType.Invites,
                        quantity: 3,
                    },
                    {
                        reward: LevelRewardType.Coin,
                        quantity: 1900,
                    },
                ],
                cost: 1000,
            };
        }
    }
}
