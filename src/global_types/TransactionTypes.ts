export const AFTER_TAX_FRACTION = 0.9;

export function applyCoinTax(original: number): number {
    return Math.floor(AFTER_TAX_FRACTION * original);
}

export enum TransactionTypesEnum {
    User,
    Convo,
    Challenge,
    Post,
    Community,
}

export enum TransactionIcon {
    Like,
    Convo,
    User,
    Feed,
    Challenge,
    Community,
    Post,
}

/**
 * Use the same generic type for both bolt and coin transactions
 */
export interface TransactionType {
    tid: string;
    time: string;
    coin?: number;
    bolts?: number;
    message: string;
    transactionType: TransactionTypesEnum;
    transactionIcon: TransactionIcon;
    data: string;
    __typename?: string;
}

export interface BoltTransactionType {
    tid: string;
    time: string;
    bolts: number;
    message: string;
    transactionType: TransactionTypesEnum;
    transactionIcon: TransactionIcon;
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
