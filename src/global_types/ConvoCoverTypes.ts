export interface FullConvoCoverType
    extends NewConvoType,
        PublicConvoCoverType,
        ActiveConvoCoverType {
    // Convo ids
    id: string;
    pid: string;

    // Static fields
    time: number;
    msg: string;

    // Convo status
    new: boolean;
    active: boolean;

    // Source user fields
    sid: string;
    sname: string;
    sviewed: boolean;
    sanony: boolean;

    // Target user fields
    tid: string;
    tname: string;
    tanony: boolean;
    tviewed: boolean;
}

export interface NewConvoType {
    // Convo ids
    id: string;
    pid: string;

    // Static fields
    time: number;
    msg: string;

    // Source user fields
    sid: string;
    sname: string;
    sanony: boolean;

    tviewed: boolean;
}

export interface ActiveConvoCoverType {
    // Convo ids
    id: string;
    pid: string;

    // Static fields
    time: number;
    msg: string;

    // Source user fields
    sid: string;
    sname: string;
    sviewed: boolean;
    sanony: boolean;

    // Target user fields
    tid: string;
    tname: string;
    tanony: boolean;
    tviewed: boolean;
}

export interface PublicConvoCoverType {
    // Convo ids
    id: string;
    pid: string;

    // Static fields
    time: number;
    msg: string;

    // Source user fields
    sid: string;
    sname: string;
    sanony: boolean;

    // Target user fields
    tid: string;
    tname: string;
    tanony: boolean;
}

export interface ConvoCoverType {
    user: string;
    id: string;
    time: number;
    msg: string;
}

export const convoCoverExample: ConvoCoverType = {
    user: "Danny Boi",
    id: "22342234",
    time: 1612463297363,
    msg: "It's a truly wonderful life, ain't it?",
};

export interface ConvoCoverMock {
    user: string;
    id: string;
    time: number;
    msg: string;
    __typename: string;
}

export const convoCoverMock: ConvoCoverMock = {
    user: "Danny Boi",
    id: "22342234",
    time: 1612463297363,
    msg: "It's a truly wonderful life, ain't it?",
    __typename: "ConvoCover",
};
