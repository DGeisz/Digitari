import { gql } from "@apollo/client";
import { UserType } from "../../../../../../../global_types/UserTypes";

export const GET_USER = gql`
    query GetUser($uid: ID!) {
        user(uid: $uid) {
            id
            firstName
            lastName
            level
            bio
            ranking
            blocked
            beenBlocked
            coin
            imgUrl

            lastCollectionTime
            newConvoUpdate
            newTransactionUpdate

            amFollowing
            followPrice

            coinSpent

            postCount
            successfulConvos

            following

            followers
        }
    }
`;

export interface GetUserQueryData {
    user: UserType;
}

export interface GetUserQueryVariables {
    uid: string;
}
