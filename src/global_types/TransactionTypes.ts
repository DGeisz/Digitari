export enum TransactionTypesEnum {
    User,
    Convo,
}

export interface TransactionType {
    tid: string;
    time: string;
    coin: number;
    message: string;
    transactionType: TransactionTypesEnum;
    data: string;
}

export interface EarningsReceipt {
    coin: number;
    time: number;
}
