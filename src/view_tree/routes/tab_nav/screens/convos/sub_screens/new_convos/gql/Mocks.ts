import { GET_NEW_CONVOS } from "./Queries";
import { exampleConvoCover } from "../../../../../../../../global_types/ConvoCoverTypes";

let convos = [];

for (let i = 0; i < 10; i++) {
    convos.push(Object.assign({}, exampleConvoCover));
}

const mock: any = {
    request: {
        query: GET_NEW_CONVOS,
        variables: {
            uid: "snoot",
        },
    },
    result: {
        data: {
            getNewConvos: convos,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const newConvosMocks: any[] = mocks;
