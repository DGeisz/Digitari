export enum DigicodeType {
    User,
    Community,
}

export interface Digicode {
    type: DigicodeType;
    id: string;
}
