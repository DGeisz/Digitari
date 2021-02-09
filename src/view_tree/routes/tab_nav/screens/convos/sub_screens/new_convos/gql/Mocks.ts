import { GET_NEW_CONVOS_TYPE } from "./Queries";
import { gExampleConvoCover } from "../../../../../../../../global_types/ConvoCoverTypes";

let convos = [];

for (let i = 0; i < 10; i++) {
    convos.push(Object.assign({}, gExampleConvoCover));
}

const mock: any = {
    request: {
        query: GET_NEW_CONVOS_TYPE,
        variables: {
            uid: "danny",
        },
    },
    result: {
        data: {
            newConvos: convos,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const newConvosMocks: any[] = mocks;
