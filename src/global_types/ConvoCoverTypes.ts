import { millisInHour } from "../global_utils/TimeRepUtils";

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

export const gExampleConvoCover: GConvoCoverType = Object.assign({}, exampleConvoCover, {__typename: "ConvoCover"})