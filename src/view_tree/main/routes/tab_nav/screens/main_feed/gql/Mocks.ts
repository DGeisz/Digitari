import { GET_FEED_TYPE } from "./Queries";
import { gPostExampleWithLink } from "../../../../../../../global_types/PostTypes";

let posts = [];

for (let i = 0; i < 10; i++) {
    posts.push(gPostExampleWithLink);
}

const mock: any = {
    request: {
        query: GET_FEED_TYPE,
        variables: {
            uid: "danny",
        },
    },
    result: {
        data: {
            feed: posts,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(mock);
}

export const feedMocks: any[] = mocks;
