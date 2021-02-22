export interface CommunityType {
    id: string;
    uid: string;
    name: string;
    description: string;
    followers: number;
    timeCreated: string;
}

export const exampleCommunity: CommunityType = {
    id: "bett",
    uid: "betty",
    name: "Those named Bett",
    description: "Everyone named Bett in the area",
    followers: 20,
    timeCreated: "1613999698186",
};
