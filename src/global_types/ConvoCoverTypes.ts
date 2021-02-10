import { millisInHour } from "../global_utils/TimeRepUtils";
import rw from "random-words";

export interface ConvoCoverType {
    // Convo ids
    id: string;
    pid: string;

    // Static fields
    time: number;
    msg: string;

    // Source user fields
    sid: string;
    sranking: number;
    sname: string;
    sviewed: boolean;
    sanony: boolean;

    // Target user fields
    tid: string;
    tranking: number;
    tname: string;
    tanony: boolean;
    tviewed: boolean;
}

export interface GConvoCoverType extends ConvoCoverType {
    __typename: string;
}

export const exampleConvoCover: ConvoCoverType = {
    id: "blue",
    pid: "asd",

    time: Date.now() - millisInHour,
    msg: "How about all of them lovely apples on them trees all around?",

    sid: "jeff",
    sranking: 1230,
    sname: "Danny",
    sviewed: false,
    sanony: true,

    tid: "danny",
    tranking: 234,
    tname: "Jeff",
    tviewed: true,
    tanony: false,
};

export const gExampleConvoCover: GConvoCoverType = Object.assign(
    {},
    exampleConvoCover,
    { __typename: "ConvoCover" }
);

export function genRandomConvoCover(): GConvoCoverType {
    const nameG = false;//Math.random() > 0.5;

    return {
        id: rw({ exactly: 1, join: " " }),
        pid: "asd",

        time: Date.now() - millisInHour,
        msg: rw({ exactly: 10, join: " " }),

        sid: nameG ? "danny" : "jeff",
        sranking: 1230,
        sname: rw({ exactly: 1, join: "" }),
        sviewed: Math.random() > 0.5,
        sanony: Math.random() > 0.5,

        tid: nameG ? "jeff" : "danny",
        tranking: 234,
        tname: rw({ exactly: 1, join: "" }),
        tviewed: Math.random() > 0.5,
        tanony: Math.random() > 0.5,
        __typename: "ConvoCover",
    };
}
