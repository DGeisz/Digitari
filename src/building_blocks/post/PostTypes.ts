export interface PostType {
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
}

export const postExampleNoLink: PostType = {
    coin: 173,
    content: "This be a post_screen in a big way",
    convoCount: 23,
    convoReward: 200,
    ranking: 142,
    responseCost: 4,
    responseCount: 23,
    time: 1612394591366,
    user: "Danny",
};

export const postExampleWithLink: PostType = {
    link: "https://expo.io/",
    coin: 173,
    content: "This be a post_screen in a big way",
    convoCount: 23,
    convoReward: 200,
    ranking: 142,
    responseCost: 4,
    responseCount: 23,
    time: 1612394591366,
    user: "Danny",
};
