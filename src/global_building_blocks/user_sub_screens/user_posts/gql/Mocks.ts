import { gPostExampleWithLink } from "../../../../../../../../../global_types/PostTypes";
import { GET_USER_POSTS_TYPE } from "./Queries";

let posts = [];

for (let i = 0; i < 10; i++) {
    posts.push(gPostExampleWithLink);
}

const mock: any = {
    request: {
        query: GET_USER_POSTS_TYPE,
        variables: {
            uid: "danny",
        },
    },
    result: {
        data: {
            userPosts: posts,
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(Object.assign({}, mock));
}

export const userPostMocks: any[] = mocks;
