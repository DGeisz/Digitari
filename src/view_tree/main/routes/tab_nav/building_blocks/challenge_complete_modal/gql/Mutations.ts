import { gql } from "@apollo/client";

export const VIEW_CHALLENGE_RECEIPT = gql`
    mutation ViewChallengeReceipt($receipt: String!) {
        viewChallengeReceipt(receipt: $receipt)
    }
`;

export interface ViewChallengeReceiptData {
    viewChallengeReceipt: string;
}

export interface ViewChallengeReceiptVariables {
    receipt: string;
}
