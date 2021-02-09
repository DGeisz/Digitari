import { GET_CONVO_TYPE } from "./Queries";
import { gExampleConvo } from "../../../../global_types/ConvoTypes";

const mock: any = {
    request: {
        query: GET_CONVO_TYPE,
        variables: {
            cid: "blue",
        },
    },
    result: {
        data: {
            convo: gExampleConvo,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(mock);
}

export const convoMocks: any[] = mocks;
