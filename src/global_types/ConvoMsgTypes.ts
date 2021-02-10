import { millisInHour } from "../global_utils/TimeRepUtils";
import rw from "random-words";

export const CONVO_MSG_TYPENAME = "ConvoMsg";

export interface ConvoMsgType {
    id: string;
    anonymous: boolean;
    content: string;
    time: number;
    uid: string;
    user: string;
}

export interface GConvoMsgType extends ConvoMsgType {
    __typename: string;
}

export const convoMsgExample: ConvoMsgType = {
    id: "blue",
    anonymous: false,
    content: "Hey there buckaroo, I'm good over here, so what's good with you?",
    // content: 'hi',
    time: 1612479508417,
    uid: "gorgon",
    // user: "hello my name is Danny 101 and I like applie pie",
    user: "danny",
};

export const gConvoMsgExample: GConvoMsgType = Object.assign(
    {},
    convoMsgExample,
    { __typename: "ConvoMsg" }
);

export function genConvoMsg(): GConvoMsgType {
    return {
        id: "blue",
        anonymous: Math.random() > 0.5,
        content: rw({ exactly: 10, join: " " }),
        time: Date.now() - Math.floor(Math.random() * millisInHour * 127),
        uid: Math.random() > 0.5 ? "danny" : "anyone",
        user: rw({ exactly: 1, join: "" }),
        __typename: "ConvoMsg",
    };
}
