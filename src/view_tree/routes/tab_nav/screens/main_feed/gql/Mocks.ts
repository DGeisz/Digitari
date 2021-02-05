import { GET_FEED, GET_FEED_TYPE } from "./Queries";
import {
    postExampleNoLink,
    postExampleNoLinkMock,
    postExampleWithLink,
} from "../../../../../../global_types/PostTypes";

let posts = [];

for (let i = 0; i < 10; i++) {
    posts.push(postExampleWithLink);
}

const mock: any = {
    request: {
        query: GET_FEED,
        variables: {
            id: "snoot",
        },
    },
    result: {
        data: {
            getFeed: posts,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(mock);
}

export const feedMocks: any[] = mocks;
