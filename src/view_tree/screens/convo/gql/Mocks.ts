import { GET_CONVO_TYPE } from "./Queries";
import { genExampleConvo, gExampleConvo } from "../../../../global_types/ConvoTypes";

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
    mocks.push(
        {
            request: {
                query: GET_CONVO_TYPE,
                variables: {
                    cid: "new" + i
                }
            },
            result: {
                data: {
                    convo: Object.assign({}, genExampleConvo(), {id: "new" + i}),
                }
            }

        });
}

for (let i = 0; i < 10; i++) {
    mocks.push(
        {
            request: {
                query: GET_CONVO_TYPE,
                variables: {
                    cid: "active" + i
                }
            },
            result: {
                data: {
                    convo: Object.assign({}, genExampleConvo(), {id: "active" + i}),
                }
            }

        });
}

for (let i = 0; i < 10; i++) {
    mocks.push(
        Object.assign({}, mock),
    )
}

export const convoMocks: any[] = mocks;
