export const COMMUNITY_TYPENAME = "Community";

export const FOLLOW_COMMUNITY_PRICE = 200;
export const FOLLOW_COMMUNITY_REWARD = 20;

export const COMMUNITY_NAME_MAX_LEN = 50;
export const COMMUNITY_DESCRIPTION_MAX_LEN = 400;

export const CREATE_COMMUNITY_PRICE = 1000;
export const CREATE_COMMUNITY_REWARD = 100;

export interface CommunityType {
    id: string;
    uid: string;
    name: string;
    amFollowing: boolean;
    description: string;
    followers: number;
    timeCreated: string;
    __typename?: string;
}

export const exampleCommunity: CommunityType = {
    id: "bett",
    uid: "betty",
    name: "Those named Bett",
    amFollowing: false,
    description: "Everyone named Bett in the area",
    followers: 20,
    timeCreated: "1613999698186",
};
