import { ConvoCoverType, exampleConvoCover, GConvoCoverType, gExampleConvoCover } from "./ConvoCoverTypes";
import {
    exampleStrippedPost,
    gExampleStrippedPost,
    gPostExampleWithLink,
    GStrippedPostType,
    PostType,
    StrippedPostType
} from "./PostTypes";
import { convoMsgExample, ConvoMsgType, gConvoMsgExample, GConvoMsgType } from "./ConvoMsgTypes";

export interface ConvoType {
    cover: ConvoCoverType;
    post: StrippedPostType;
    messages: ConvoMsgType[];
    status: number;
}

export interface GConvoType {
    cover: GConvoCoverType;
    post: GStrippedPostType;
    messages: GConvoMsgType[];
    status: number;
    __typename: string;
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

export const gExampleConvo: GConvoType = {
    cover: gExampleConvoCover,
    post: gExampleStrippedPost,
    messages: [
        gConvoMsgExample,
        gConvoMsgExample,
        gConvoMsgExample,
        gConvoMsgExample,
        gConvoMsgExample,
        gConvoMsgExample,
    ],
    status: 0,
    __typename: "Convo"
}