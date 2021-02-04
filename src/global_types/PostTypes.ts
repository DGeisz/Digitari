import { convoCoverExample, ConvoCoverType } from "./ConvoCoverTypes";

export interface PostType {
    id: string;
    user: string;
    ranking: number;
    time: number;
    content: string;
    link?: string;
    convoReward: number;
    responseCost: number;
    coin: number;
    convoCount: number;
    responseCount: number;
    coinDonated: boolean;
    convos: ConvoCoverType[];
}

export const postExampleNoLink: PostType = {
    id: "asd",
    coin: 40000,
    content: `Hi my name is Jeff and I'm an antelope. Why, you ask, do I mention that? It is my cornerstone, and I'm in love with that fact about myself.`,
    convoCount: 23,
    convoReward: 200,
    ranking: 142,
    responseCost: 4,
    responseCount: 23,
    time: 1612394591366,
    user: "Danny",
    coinDonated: false,
    convos: [convoCoverExample, convoCoverExample],
};

export const postExampleWithLink: PostType = {
    id: "asd",
    link: "https://expo.io/",
    coinDonated: true,
    coin: 173,
    content: "This be a post_screen in a big way",
    convoCount: 23,
    convoReward: 200,
    ranking: 142,
    responseCost: 4,
    responseCount: 23,
    time: 1612394591366,
    user: "Danny",
    convos: [convoCoverExample, convoCoverExample],
};
