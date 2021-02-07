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

export const exampleConvoCover: ConvoCoverType = {
    id: "blue",
    pid: "greey",

    time: Date.now() - millisInHour,
    msg: "How about all of them lovely apples on them trees all around?",

    sid: "danny",
    sranking: 1230,
    sname: "Danny",
    sviewed: false,
    sanony: true,

    tid: "jeff",
    tranking: 234,
    tname: "Jeff",
    tviewed: true,
    tanony: false,
};
