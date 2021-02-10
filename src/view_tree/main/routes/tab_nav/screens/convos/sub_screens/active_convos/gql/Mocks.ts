import { GET_ACTIVE_CONVOS_TYPE } from "./Queries";
import {
    genRandomConvoCover,
    gExampleConvoCover,
} from "../../../../../../../../../global_types/ConvoCoverTypes";

let convos = [];

for (let i = 0; i < 10; i++) {
    convos.push(Object.assign({}, genRandomConvoCover(), { id: "active" + i }));
}

const mock: any = {
    request: {
        query: GET_ACTIVE_CONVOS_TYPE,
        variables: {
            uid: "danny",
        },
    },
    result: {
        data: {
            activeConvos: convos,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const activeConvosMocks: any[] = mocks;
