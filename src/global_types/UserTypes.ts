export interface UserType {
    id: string;
    user: string;
    level: number;
    bio: string;
    ranking: number;
    blocked: number;
    beenBlocked: number;
    successfulConvos: number;
    coin: number;
    followers: number;
    following: number;
}

export const exampleUser: UserType = {
    id: 'asdf',
    user: "Dern the Cern",
    level: 12,
    bio: "Hi my name is Danny. I bool, I vape, I joust, and I cape.  Here's to another day ba-rangling",
    ranking: 124,
    blocked: 12,
    beenBlocked: 435,
    successfulConvos: 678,
    coin: 102333,
    followers: 141,
    following: 234
}