import {
    BioColors,
    BioFontsEnum,
    NameFonts,
    NameFontsEnum,
    ProfileColors,
    ProfileStickers,
} from "./ShopTypes";

export const USER_TYPENAME = "User";

export const FOLLOW_USER_PRICE = 200;
export const DIGIBOLT_PRICE = 10;

export const MAX_BIO_LENGTH = 200;
export const MAX_BIO_LINK_LENGTH = 1000;

export const CHANGE_BIO_PRICE = 50;
export const CHANGE_PROFILE_PIC_PRICE = 100;
export const CHANGE_LINK_PRICE = 200;

export const BOOST_WALLET_PRICE = 1000;

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

    walletBonusEnd: string;
    maxWallet: number;

    nameFont: NameFontsEnum;
    nameFontsPurchased: NameFontsEnum[];
    nameColor: ProfileColors;
    nameColorsPurchased: ProfileColors[];
    bioFont: BioFontsEnum;
    bioFontsPurchased: BioFontsEnum[];
    bioColor: BioColors;
    bioColorsPurchased: BioColors[];
    profileSticker: ProfileStickers;
    profileStickersPurchased: ProfileStickers[];

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
