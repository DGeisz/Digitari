import { gql } from "@apollo/client";
import { TransactionType } from "../../../../../../../global_types/TransactionTypes";

export const LAST_COLLECTION_TIME = gql`
    query LastCollectionTime($uid: ID!) {
        user(uid: $uid) {
            id
            lastCollectionTime
            transTotal
            ranking
            walletBonusEnd
            maxWallet
            maxBoltWallet
            boltTransTotal
        }
    }
`;

export interface LastCollectionTimeData {
    user: {
        lastCollectionTime: string;
        ranking: number;
        transTotal: string;
        maxWallet: string;
        walletBonusEnd: string;
        maxBoltWallet: string;
        boltTransTotal: string;
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
            transactionIcon
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

export const BOLT_TRANSACTIONS = gql`
    query BoltTransactions($lastTime: String) {
        boltTransactions(lastTime: $lastTime) {
            tid
            time
            bolts
            message
            transactionType
            transactionIcon
            data
        }
    }
`;

export interface BoltTransData {
    boltTransactions: TransactionType[];
}

export interface BoltTransVariables {
    lastTime?: string;
}
