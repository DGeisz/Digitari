import { UserType } from "../../../../../../../../global_types/UserTypes";

export const tutorialUser: UserType = {
    id: "",
    firstName: "",
    lastName: "",
    remainingInvites: 0,

    amFollowing: false,

    bio: "",
    ranking: 0,
    blocked: 0,
    beenBlocked: 0,
    coin: 0,

    lastCollectionTime: "0",

    newConvoUpdate: false,
    newTransactionUpdate: false,

    challengeReceipts: [],

    coinSpent: 0,

    receivedFromConvos: 0,
    rfcChallengeIndex: 0,

    spentOnConvos: 0,
    socChallengeIndex: 0,

    successfulConvos: 0,
    scChallengeIndex: 0,

    postCount: 0,
    pcChallengeIndex: 0,

    followers: 0,
    followersChallengeIndex: 0,

    following: 0,
    followingChallengeIndex: 0,

    communityFollowersChallengeIndex: 0,
    maxCommunityFollowers: 0,
};
