import { ConvoCoverType, exampleConvoCover } from "./ConvoCoverTypes";

export const POST_CONTENT_MAX_LEN = 250;
export const POST_ADD_ON_CONTENT_MAX_LEN = 10000;

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

    addOn: PostAddOn;
    addOnContent: string;
    target: PostTarget;
    cmid?: string;
    communityName?: string;

    convoReward: number;
    responseCost: number;

    coin: number;
    coinDonated?: boolean;

    convoCount: number;
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

export const postExampleNoLink: PostType = {
    addOn: PostAddOn.Link,
    // addOnContent: `Hi my name is Jeff and I'm an antelope. Why, you ask, do I mention that? It is my cornerstone, and I'm in love with that fact about myself. and I'm in love with that fact about myself and I'm in love with that fact about myself. h that fact about myself`,
    // addOnContent:
    //     "https://d3671gkd53urlb.cloudfront.net/c17c121d-6594-41bf-9d38-37fba3154c99/p-SZF.jpg",
    addOnContent:
        "https://www.reddit.com/r/berkeley/comments/mw85w8/best_feeling_ever/",
    // addOnContent: "https://andrejgajdos.com/how-to-create-a-link-preview/",
    target: PostTarget.Community,
    communityName: "This is my community oh yes it is",
    cmid: "220c250a-6bf4-4929-b55e-da69d97b7a45",
    id: "asd",
    uid: "c17c121d-6594-41bf-9d38-37fba3154c99",
    coin: 40000,
    content: `Hi my name is Jeff and I'm an antelope. Why, you ask, do I mention that? It is my cornerstone, and I'm in love with that fact about myself. and I'm in love with that fact about myself and I'm in love with that fact about myself. h that fact about myself`,
    convoReward: 200,
    tier: 0,
    responseCost: 4,
    time: (1612394591366).toString(),
    user: "Danny",
    coinDonated: false,
    convoCount: 10,
};

export const exampleStrippedPost: StrippedPostType = {
    id: "asd",
    uid: "danny",
    content: `Hi my name is Jeff and I'm an antelope. Why, you ask, do I mention that? It is my cornerstone, and I'm in love with that fact about myself.`,
    ranking: 142,
    time: 1612394591366,
    user: "Danny",
    link: "https://expo.io/",
    convoReward: 200,
};

export const gExampleStrippedPost = Object.assign({}, exampleStrippedPost, {
    __typename: "Post",
});
