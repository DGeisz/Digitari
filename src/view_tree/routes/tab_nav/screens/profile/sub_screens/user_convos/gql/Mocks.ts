import { GET_USER_CONVOS } from "./Queries";
import { convoCoverExample } from "../../../../../../../../global_types/ConvoCoverTypes";

let convos = [];

for (let i = 0; i < 10; i++) {
    convos.push(Object.assign({}, convoCoverExample));
}

const mock: any = {
    request: {
        query: GET_USER_CONVOS,
        variables: {
            uid: "snoot",
        },
    },
    result: {
        data: {
            getUserConvos: convos,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const userConvosMocks: any[] = mocks;
