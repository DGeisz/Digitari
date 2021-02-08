import { GET_CHALLENGES } from "./Queries";
import { exampleChallenge } from "../../../../../../../../global_types/ChallengeTypes";

let challenges = [];
for (let i = 0; i < 20; i++) {
    challenges.push(exampleChallenge);
}

const mock: any = {
    request: {
        query: GET_CHALLENGES,
    },
    result: {
        data: {
            challenges: challenges
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(mock);
}

export const challengeMocks: any[] = mocks;
