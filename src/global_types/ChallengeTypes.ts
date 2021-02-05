export interface ChallengeType {
    description: string;
    index: number;
    coin: number;
    total: number;
    progress: number;
}

export const exampleChallenge: ChallengeType = {
    description: "Get 10k followers",
    index: 1,
    coin: 100,
    total: 10000,
    progress: 8000,
};
