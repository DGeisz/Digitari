import { GET_CONVO_TYPE } from "./Queries";
import {
    genExampleConvo,
    gExampleConvo,
} from "../../../../global_types/ConvoTypes";
import { BLOCK_INITIAL_CONVO_TYPE, DISMISS_CONVO_TYPE } from "./Mutations";

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
    mocks.push({
        request: {
            query: GET_CONVO_TYPE,
            variables: {
                cid: "new" + i,
            },
        },
        result: {
            data: {
                convo: Object.assign({}, genExampleConvo(true), {
                    id: "new" + i,
                }),
            },
        },
    });
}

for (let i = 0; i < 10; i++) {
    mocks.push({
        request: {
            query: GET_CONVO_TYPE,
            variables: {
                cid: "active" + i,
            },
        },
        result: {
            data: {
                convo: Object.assign({}, genExampleConvo(false), {
                    id: "active" + i,
                }),
            },
        },
    });
}

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const convoMocks: any[] = mocks;

let dismiss_mocks = [];
for (let i = 0; i < 10; i++) {
    dismiss_mocks.push({
        request: {
            query: DISMISS_CONVO_TYPE,
            variables: {
                cid: "active" + i,
            },
        },
        result: {
            data: {
                dismissConvo: {
                    id: "active" + i,
                },
            },
        },
    });
}

for (let i = 0; i < 10; i++) {
    dismiss_mocks.push({
        request: {
            query: DISMISS_CONVO_TYPE,
            variables: {
                cid: "new" + i,
            },
        },
        result: {
            data: {
                dismissConvo: {
                    id: "new" + i,
                },
            },
        },
    });
}

export const dismissConvosMocks = dismiss_mocks;

let block_mocks = [];
for (let i = 0; i < 10; i++) {
    block_mocks.push({
        request: {
            query: BLOCK_INITIAL_CONVO_TYPE,
            variables: {
                cid: "active" + i,
            },
        },
        result: {
            data: {
                dismissConvo: {
                    id: "active" + i,
                },
            },
        },
    });
}

for (let i = 0; i < 10; i++) {
    block_mocks.push({
        request: {
            query: BLOCK_INITIAL_CONVO_TYPE,
            variables: {
                cid: "new" + i,
            },
        },
        result: {
            data: {
                dismissConvo: {
                    id: "new" + i,
                },
            },
        },
    });
}

export const blockInitialConvosMocks = block_mocks;
