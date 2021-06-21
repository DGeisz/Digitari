export const USER_TYPENAME = "User";

export const FOLLOW_USER_PRICE = 200;

export interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    remainingInvites: number;

    newUser?: boolean;

    amFollowing: boolean;

    bio: string;
    ranking: number;
    blocked: number;
    beenBlocked: number;
    coin: number;
    imgUrl?: string;

    lastCollectionTime: string;

    newConvoUpdate: boolean;
    newTransactionUpdate: boolean;

    challengeReceipts: string[];

    coinSpent: number;

    // Challenge fields
    receivedFromConvos: number;
    rfcChallengeIndex: number;

    spentOnConvos: number;
    socChallengeIndex: number;

    successfulConvos: number;
    scChallengeIndex: number;

    postCount: number;
    pcChallengeIndex: number;

    followers: number;
    followersChallengeIndex: number;

    following: number;
    followingChallengeIndex: number;

    communityFollowersChallengeIndex: number;
    maxCommunityFollowers: number;
}
