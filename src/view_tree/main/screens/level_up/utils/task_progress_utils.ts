import {
    LevelTask,
    LevelTaskType,
} from "../../../../../global_types/LevelTypes";
import { UserType } from "../../../../../global_types/UserTypes";

export function getTaskProgress(task: LevelTask, user: UserType): number {
    switch (task.task) {
        case LevelTaskType.FollowUsers: {
            return user.levelUsersFollowed;
        }
        case LevelTaskType.FollowComms: {
            return user.levelsCommsFollowed;
        }
        case LevelTaskType.FollowUsersOrComms: {
            return user.levelsCommsFollowed + user.levelUsersFollowed;
        }
        case LevelTaskType.CollectCoin: {
            return user.levelCoinCollected;
        }
        case LevelTaskType.CreatePosts: {
            return user.levelPostsCreated;
        }
        case LevelTaskType.BuyBolts: {
            return user.levelPostBoltsBought;
        }
        case LevelTaskType.Invite: {
            return user.levelInvitedAndJoined;
        }
        case LevelTaskType.NewResponse: {
            return user.levelNewResponses;
        }
        case LevelTaskType.SuccessfulConvos: {
            return user.levelSuccessfulConvos;
        }
        case LevelTaskType.CreateCommunities: {
            return user.levelCommsCreated;
        }
        case LevelTaskType.SpendCoinCreatingPosts: {
            return parseInt(user.levelCoinSpentOnPosts);
        }
        case LevelTaskType.EarnCoinFromPosts: {
            return parseInt(user.levelCoinEarnedFromPosts);
        }
        case LevelTaskType.CreateProfilePic: {
            return !!user.imgUrl ? 1 : 0;
        }
        case LevelTaskType.CreateBio: {
            return !!user.bio ? 1 : 0;
        }
        case LevelTaskType.CreateBioLink: {
            return !!user.link ? 1 : 0;
        }
        case LevelTaskType.UpgradeWallet: {
            return Math.min(parseInt(user.maxWallet), task.quantity);
        }
        case LevelTaskType.ConvoStreak: {
            return Math.min(user.ranking, task.quantity);
        }
    }
}

/**
 * Gets whether the task is completed
 */
export function taskCompleted(task: LevelTask, user: UserType): boolean {
    return getTaskProgress(task, user) >= task.quantity;
}
