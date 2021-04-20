export const COMMUNITY_TYPENAME = "Community";

export const FOLLOW_COMMUNITY_PRICE = 50;

export interface CommunityType {
    id: string;
    uid: string;
    name: string;
    amFollowing: boolean;
    description: string;
    followers: number;
    timeCreated: string;
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
