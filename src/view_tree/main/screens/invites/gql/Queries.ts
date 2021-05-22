import { gql } from "@apollo/client";

export const GET_REMAINING_INVITES = gql`
    query GetRemainingInvites($uid: ID!) {
        user(uid: $uid) {
            id
            remainingInvites
        }
    }
`;

export interface GetRemainingInvitesData {
    user: {
        id: string;
        remainingInvites: number;
    };
}

export interface GetRemainingInvitesVariables {
    uid: string;
}
