import {
    LevelReward,
    LevelRewardType,
} from "../../../../../global_types/LevelTypes";
import { toCommaRep, toRep } from "../../../../../global_utils/ValueRepUtils";
import { DOUBLE_NEWLINE } from "../../../../../global_utils/StringUtils";

interface RewardDescription {
    description: string;
    title: string;
    modalDescription: string;
}

export function getRewardDescription(reward: LevelReward): RewardDescription {
    switch (reward.reward) {
        case LevelRewardType.Coin: {
            return {
                description: "",
                title: "",
                modalDescription: "",
            };
        }
        case LevelRewardType.MaxFollowers: {
            return {
                description: `+${toCommaRep(reward.quantity)} Max Followers`,
                title: "Max Followers",
                modalDescription:
                    "This is the maximum number of people that can follow you." +
                    DOUBLE_NEWLINE +
                    `As a reward for leveling up, ${toRep(
                        reward.quantity
                    )} more people can follow you.`,
            };
        }
        case LevelRewardType.MaxFollowing: {
            return {
                description: `+${toCommaRep(reward.quantity)} Max Following`,
                title: "Max Following",
                modalDescription:
                    "This is the maximum number of people or communities that you can follow." +
                    DOUBLE_NEWLINE +
                    `As a reward for leveling up, you can follow ${toRep(
                        reward.quantity
                    )} more people or communities.`,
            };
        }
        case LevelRewardType.MaxPostRecipients: {
            return {
                description: `+${toCommaRep(reward.quantity)} Post Audience`,
                title: "Post Audience",
                modalDescription:
                    "This is the maximum number of people who can receive your posts in their feed." +
                    DOUBLE_NEWLINE +
                    `As a reward for leveling up, you can send your posts to ${toRep(
                        reward.quantity
                    )} more people.`,
            };
        }
        case LevelRewardType.Invites: {
            return {
                description: `+${toCommaRep(reward.quantity)} Invites`,
                title: "Invites",
                modalDescription: "",
            };
        }
        case LevelRewardType.ProfilePic: {
            return {
                description: "+ Profile Pic",
                title: "Profile Pic",
                modalDescription: "",
            };
        }
        case LevelRewardType.Bio: {
            return {
                description: "+ Profile Bio",
                title: "Profile Bio",
                modalDescription: "",
            };
        }
        case LevelRewardType.ProfileLink: {
            return {
                description: "+ Profile Bio Link",
                title: "Profile Bio Link",
                modalDescription: "",
            };
        }
    }

    /*TODO: Get rid of this*/
    return {
        description: "",
        title: "",
        modalDescription: "",
    };
}
