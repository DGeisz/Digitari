import { GET_USER_POSTS } from "./Queries";
import { postExampleWithLink } from "../../../../../../../../global_types/PostTypes";

let posts = [];

for (let i = 0; i < 10; i++) {
    posts.push(postExampleWithLink);
}

const mock: any = {
    request: {
        query: GET_USER_POSTS,
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
