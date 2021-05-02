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
    __typename?: string;
}

export interface EarningsReceipt {
    coin: number;
    time: number;
}

export const TRANSACTION_TYPENAME = "Transaction";

export interface TransactionReceipt {
    id: string;
    amount: number;
}
