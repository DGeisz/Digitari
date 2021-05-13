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

            amFollowing
            followPrice
            newUser
            newConvoUpdate
            newTransactionUpdate
            level
            bio
            ranking
            blocked
            beenBlocked
            coin
            challengeReceipts
            coinSpent

            receivedFromConvos
            rfcChallengeIndex
            spentOnConvos
            socChallengeIndex
            successfulConvos
            scChallengeIndex
            postCount
            pcChallengeIndex
            followers
            followersChallengeIndex
            following
            followingChallengeIndex
            communityFollowersChallengeIndex
            maxCommunityFollowers
        }
    }
`;

export interface GetUserQueryData {
    user: UserType;
}

export interface GetUserQueryVariables {
    uid: string;
}
