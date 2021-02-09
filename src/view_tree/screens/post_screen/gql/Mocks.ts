import { postExampleWithLink } from "../../../../global_types/PostTypes";
import { exampleConvoCover } from "../../../../global_types/ConvoCoverTypes";
import { GET_POST } from "./Queries";

let convos = [];

for (let i = 0; i < 10; i++) {
    convos.push(exampleConvoCover);
}

const mock: any = {
    request: {
        query: GET_POST,
        variables: {
            pid: "asd",
        },
    },
    result: {
        data: {
            post: Object.assign({}, postExampleWithLink, { convos }),
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const postMocks: any[] = mocks;
