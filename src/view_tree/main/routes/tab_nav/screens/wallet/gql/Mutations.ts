import { gql } from "@apollo/client";

export const COLLECT_EARNINGS = gql`
    mutation CollectEarnings {
        collectEarnings {
            coin
            time
        }
    }
`;

export interface CollectEarningsData {
    collectEarnings: {
        coin: number;
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
