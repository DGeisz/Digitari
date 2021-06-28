import { gql } from "@apollo/client";
import { TransactionType } from "../../../../../../../global_types/TransactionTypes";

export const LAST_COLLECTION_TIME = gql`
    query LastCollectionTime($uid: ID!) {
        user(uid: $uid) {
            id
            lastCollectionTime
            transTotal
            ranking
        }
    }
`;

export interface LastCollectionTimeData {
    user: {
        lastCollectionTime: string;
        ranking: number;
        transTotal: number;
    };
}

export interface LastCollectionTimeVariables {
    uid: string;
}

export const TRANSACTIONS = gql`
    query Transactions($lastTime: String) {
        transactions(lastTime: $lastTime) {
            tid
            time
            coin
            message
            transactionType
            data
        }
    }
`;

export interface TransactionsData {
    transactions: TransactionType[];
}

export interface TransactionsVariables {
    lastTime?: string;
}
