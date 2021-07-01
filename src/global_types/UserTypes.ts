import { NameFonts, NameFontsEnum } from "./ShopTypes";

export const USER_TYPENAME = "User";

export const FOLLOW_USER_PRICE = 200;
export const DIGIBOLT_PRICE = 10;

export const MAX_BIO_LENGTH = 200;
export const MAX_BIO_LINK_LENGTH = 1000;

export interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    remainingInvites: number;

    newUser?: boolean;

    amFollowing: boolean;

    bio: string;
    link: string;
    ranking: number;
    blocked: number;
    beenBlocked: number;
    coin: number;
    bolts: number;
    imgUrl?: string;

    nameFont: NameFontsEnum;
    nameColor: ProfileColors;
    bioFont: NameFonts;
    bioColor: ProfileColors;
    profileSticker: ProfileStickers;

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

export enum ProfileColors {
    Default,
}

export enum ProfileStickers {
    Default,
}
