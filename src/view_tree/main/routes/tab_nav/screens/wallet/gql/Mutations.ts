import { gql } from "@apollo/client";

export const COLLECT_EARNINGS = gql`
    mutation CollectEarnings {
        collectEarnings {
            coin
            bolts
            time
        }
    }
`;

export interface CollectEarningsData {
    collectEarnings: {
        coin: number;
        bolts: number;
        time: string;
    };
}

export const VIEWED_TRANSACTION = gql`
    mutation ViewedTransaction {
        viewedTransactionUpdate
    }
`;

export interface ViewedTransactionData {
    viewedTransactionUpdate: boolean;
}
