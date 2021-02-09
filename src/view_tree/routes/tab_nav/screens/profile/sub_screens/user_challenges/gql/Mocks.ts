import { GET_CHALLENGES_TYPE } from "./Queries";
import { gExampleChallenge } from "../../../../../../../../global_types/ChallengeTypes";

let challenges = [];
for (let i = 0; i < 20; i++) {
    challenges.push(gExampleChallenge);
}

const mock: any = {
    request: {
        query: GET_CHALLENGES_TYPE,
    },
    result: {
        data: {
            challenges: challenges,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(mock);
}

export const challengeMocks: any[] = mocks;
