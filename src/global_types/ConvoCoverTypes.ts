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
