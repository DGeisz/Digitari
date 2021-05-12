import { gql } from "@apollo/client";

export const USER_CHALLENGE_RECEIPTS = gql`
    query GetUserChallengeReceipts($uid: ID!) {
        user(uid: $uid) {
            id
            challengeReceipts
        }
    }
`;

export interface UserChallengeReceiptsData {
    user: {
        id: string;
        challengeReceipts: string[];
    };
}

export interface UserChallengeReceiptsVariables {
    uid: string;
}
