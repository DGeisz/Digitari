import { GET_CONVO } from "./Queries";
import { exampleConvo } from "../../../../global_types/ConvoTypes";

const mock: any = {
    request: {
        query: GET_CONVO,
        variables: {
            cid: "blue",
        },
    },
    result: {
        data: {
            convo: exampleConvo,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(mock);
}

export const convoMocks: any[] = mocks;
