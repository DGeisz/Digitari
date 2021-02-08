import { GET_USER_CONVOS } from "./Queries";
import { exampleConvoCover } from "../../../../../../../../global_types/ConvoCoverTypes";

let convos = [];

for (let i = 0; i < 10; i++) {
    convos.push(Object.assign({}, exampleConvoCover));
}

const mock: any = {
    request: {
        query: GET_USER_CONVOS,
        variables: {
            uid: "danny",
        },
    },
    result: {
        data: {
            userConvos: convos,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const userConvosMocks: any[] = mocks;
