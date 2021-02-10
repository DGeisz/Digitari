import {
    ConvoCoverType,
    exampleConvoCover,
    GConvoCoverType,
    genRandomConvoCover,
    gExampleConvoCover,
} from "./ConvoCoverTypes";
import {
    exampleStrippedPost,
    gExampleStrippedPost,
    gPostExampleWithLink,
    GStrippedPostType,
    PostType,
    StrippedPostType,
} from "./PostTypes";
import {
    convoMsgExample,
    ConvoMsgType,
    gConvoMsgExample,
    GConvoMsgType,
    genConvoMsg,
} from "./ConvoMsgTypes";

export const CONVO_TYPENAME = "Convo";

export interface ConvoType {
    id: string;
    cover: ConvoCoverType;
    post: StrippedPostType;
    messages: ConvoMsgType[];
    status: number;
}

export interface GConvoType {
    id: string;
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
    id: "blue",
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
    id: "blue",
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
    __typename: "Convo",
};

export function genExampleConvo(newConvo: boolean): GConvoType {
    let msgs = [];
    let num = Math.floor(Math.random() * 10) + 1;

    // for (let i = 0; i < num; i++) {
    //     msgs.push(genConvoMsg());
    // }
    msgs.push(genConvoMsg());

    const cover = genRandomConvoCover();

    return {
        id: cover.id,
        cover: cover,
        post: gExampleStrippedPost,
        messages: msgs,
        status: newConvo ? 0 : convoStatus.pendingCompletion, //Math.floor(Math.random() * 6) - 3,
        __typename: "Convo",
    };
}
