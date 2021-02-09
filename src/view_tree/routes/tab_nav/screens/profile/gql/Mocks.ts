import { gExampleUser } from "../../../../../../global_types/UserTypes";
import { GET_USER_TYPE } from "./Queries";

let mock = {
    request: {
        query: GET_USER_TYPE,
    },
    result: {
        data: {
            user: gExampleUser,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const userMocks = mocks;
