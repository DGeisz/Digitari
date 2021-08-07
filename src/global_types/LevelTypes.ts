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
