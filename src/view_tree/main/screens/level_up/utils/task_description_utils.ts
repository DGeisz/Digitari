import {
    LevelTask,
    LevelTaskType,
} from "../../../../../global_types/LevelTypes";
import { toCommaRep } from "../../../../../global_utils/ValueRepUtils";

export function getTaskDescription(task: LevelTask): string {
    switch (task.task) {
        case LevelTaskType.FollowUsers: {
            if (task.quantity === 1) {
                return "Follow a user";
            } else {
                return `Follow ${toCommaRep(task.quantity)} users`;
            }
        }
        case LevelTaskType.FollowComms: {
            if (task.quantity === 1) {
                return "Follow a community";
            } else {
                return `Follow ${toCommaRep(task.quantity)} communities`;
            }
        }
        case LevelTaskType.FollowUsersOrComms: {
            if (task.quantity === 1) {
                return "Follow a user or a community";
            } else {
                return `Follow ${toCommaRep(
                    task.quantity
                )} users or communities`;
            }
        }
        case LevelTaskType.CollectCoin: {
            return `Collect ${toCommaRep(task.quantity)} coin from your wallet`;
        }
        case LevelTaskType.CreatePosts: {
            if (task.quantity === 1) {
                return "Create a post";
            } else {
                return `Create ${toCommaRep(task.quantity)} posts`;
            }
        }
        case LevelTaskType.BuyBolts: {
            return `Buy ${toCommaRep(task.quantity)} bolts from posts`;
        }
        case LevelTaskType.Invite: {
            return `Invite ${toCommaRep(
                task.quantity
            )} people to Digitari (they must create accounts)`;
        }
        case LevelTaskType.NewResponse: {
            if (task.quantity === 1) {
                return "Respond to a post";
            } else {
                return `Respond to ${toCommaRep(task.quantity)} posts`;
            }
        }
        case LevelTaskType.SuccessfulConvos: {
            if (task.quantity === 1) {
                return "Have a successful convo";
            } else {
                return `Have ${toCommaRep(task.quantity)} successful convos`;
            }
        }
        case LevelTaskType.CreateCommunities: {
            if (task.quantity === 1) {
                return "Create a community";
            } else {
                return `Create ${toCommaRep(task.quantity)} communities`;
            }
        }
        case LevelTaskType.SpendCoinCreatingPosts: {
            return `Spend ${toCommaRep(task.quantity)} coin creating posts`;
        }
        case LevelTaskType.EarnCoinFromPosts: {
            return `Earn ${toCommaRep(task.quantity)} coin from posts`;
        }
        case LevelTaskType.CreateProfilePic: {
            return "Set your profile pic";
        }
        case LevelTaskType.CreateBio: {
            return "Set your bio";
        }
        case LevelTaskType.CreateBioLink: {
            return "Set your bio link";
        }
        case LevelTaskType.UpgradeWallet: {
            return `Upgrade wallet max capacity to ${toCommaRep(
                task.quantity
            )} coin`;
        }
        case LevelTaskType.ConvoStreak: {
            return `Have a Convo Streak of at least ${toCommaRep(
                task.quantity
            )}`;
        }
    }
}
