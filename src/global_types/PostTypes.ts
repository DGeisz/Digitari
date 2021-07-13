import { NameFontsEnum, ProfileColors, ProfileStickers } from "./ShopTypes";

export const POST_TYPENAME = "Post";

export const POST_CONTENT_MAX_LEN = 250;
export const POST_ADD_ON_CONTENT_MAX_LEN = 10000;
export const COST_PER_RECIPIENT = 10;
export const POST_BLOCK_COST = 200;

export const BOLT_HASH_SEED = "Digibolts";

export enum PostAddOn {
    None,
    Text,
    Image,
    Link,
}

export enum PostTarget {
    MyFollowers,
    Community,
}

export interface PostType {
    id: string;
    uid: string;

    user: string;
    tier: number;
    time: string;
    content: string;

    nameColor: ProfileColors;
    nameFont: NameFontsEnum;
    sticker: ProfileStickers;

    addOn: PostAddOn;
    addOnContent: string;
    target: PostTarget;
    cmid?: string;
    communityName?: string;

    responseCost: number;

    coin: number;

    convoCount: number;
    responseCount: number;
}

export interface GPostType extends PostType {
    __typename: string;
}

export interface StrippedPostType {
    id: string;
    uid: string;
    user: string;
    ranking: number;
    time: number;
    content: string;
    link?: string;
    convoReward: number;
}

export interface GStrippedPostType extends StrippedPostType {
    __typename: string;
}
