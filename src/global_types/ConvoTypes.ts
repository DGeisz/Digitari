import { ConvoCoverType, exampleConvoCover } from "./ConvoCoverTypes";
import { exampleStrippedPost, PostType, StrippedPostType } from "./PostTypes";
import { convoMsgExample, ConvoMsgType } from "./ConvoMsgTypes";

export interface ConvoType {
    cover: ConvoCoverType;
    post: StrippedPostType;
    messages: ConvoMsgType[];
    status: number;
}

export const convoStatus = {
    dismissed: -3,
    blocked: -2,
    finished: -1,
    new: 0,
    active: 1,
    pendingCompletion: 2,
};

export const exampleConvo: ConvoType = {
    cover: exampleConvoCover,
    post: exampleStrippedPost,
    messages: [
        convoMsgExample,
        // convoMsgExample,
        // convoMsgExample,
        // convoMsgExample,
        // convoMsgExample,
        // convoMsgExample,
        // convoMsgExample,
        // convoMsgExample,
    ],
    status: 0,
};
