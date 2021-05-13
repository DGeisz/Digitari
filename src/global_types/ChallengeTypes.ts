import { toCommaRep } from "../global_utils/ValueRepUtils";

export const ChallengeTypes = {
    CommunityFollowers: "cf",
    Followers: "flr",
    Following: "flw",
    PostCount: "pc",
    ReceivedFromConvos: "rfc",
    SpentOnConvos: "soc",
    SuccessfulConvos: "sc",
};

export function createChallengeReceipt(
    challengeType: keyof typeof ChallengeTypes,
    amount: number
): string {
    return [ChallengeTypes[challengeType], amount].join(":");
}

export function challengeMessageFromReceipt(receipt: string): string {
    const [challengeType, stringAmount] = receipt.split(":");
    const amount = parseInt(stringAmount);

    if (!!challengeType && !isNaN(amount)) {
        return generateChallengeMessage(challengeType, amount);
    } else {
        return "";
    }
}

export function generateChallengeMessage(
    challengeType: string,
    amount: number
): string {
    switch (challengeType) {
        case ChallengeTypes.CommunityFollowers:
            return `Create a community with ${toCommaRep(amount)} followers`;
        case ChallengeTypes.Followers:
            if (amount === 1) {
                return "Get one follower";
            } else {
                return `Get ${toCommaRep(amount)} followers`;
            }
        case ChallengeTypes.Following:
            if (amount === 1) {
                return "Follow one user or community";
            } else {
                return `Follow ${toCommaRep(amount)} users or communities`;
            }
        case ChallengeTypes.PostCount:
            if (amount === 1) {
                return "Create a post";
            } else {
                return `Create ${toCommaRep(amount)} posts`;
            }
        case ChallengeTypes.ReceivedFromConvos:
            return `Receive ${toCommaRep(
                amount
            )} digicoin from likes or responses`;
        case ChallengeTypes.SpentOnConvos:
            return `Spend ${toCommaRep(amount)} digicoin on likes or responses`;
        case ChallengeTypes.SuccessfulConvos:
            if (amount === 1) {
                return "Have one successful convo";
            } else {
                return `Have ${toCommaRep(amount)} successful convos`;
            }
        default:
            return "";
    }
}

export enum ChallengeClass {
    Bronze = 1,
    Silver,
    Gold,
    Supreme,
}

export interface ChallengeType {
    class: ChallengeClass; // IE Bronze,
    stat: string; // Which stat this challenge measures
    reward: number;
    goal: number;
}

// export interface ChallengeType {
//     class: number;
//     tier: number; // What level challenge is this
//     index: number; // Essentially functions as a sortable id
//     description: string;
//     coinReward: number;
//     goal: number; // Number necessary to achieve goal
// }
//
// export interface GChallengeType extends ChallengeType {
//     __typename: string;
// }
//
// export const challengeClasses = {
//     coinSpent: 0,
//     postCount: 1,
//     donated2Other: 2,
//     donated2User: 3,
//     responses2Other: 4,
//     responses2User: 5,
//     successfulConvos: 6,
//     following: 7,
//     followers: 8,
//     followersViaLink: 9,
//     comsCreated: 10,
//     welcomeCount: 11,
//     invite2ComViaLink: 12,
// };
//
// export const exampleChallenge: ChallengeType = {
//     description: "Get 1,000 followers",
//     // description: "This is really really really really really really really long description",
//     index: 1,
//     tier: 3,
//     class: challengeClasses.followers,
//     coinReward: 200,
//     goal: 1000,
// };
//
// export const gExampleChallenge: GChallengeType = Object.assign(
//     {},
//     exampleChallenge,
//     { __typename: "Challenge" }
// );
