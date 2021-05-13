import { gql } from "@apollo/client";
import { UserType } from "../../global_types/UserTypes";

export const CREATE_OR_FETCH_USER = gql`
    mutation CreateOrFetchUser(
        $firstName: String!
        $lastName: String!
        $email: String!
    ) {
        createOrFetchUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
        ) {
            id
            firstName
            lastName
            userName
            email
            timeCreated
            imgUrl

            lastCollectionTime

            # Indicates whether the person who fetched this user is following this user.
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

            # Fields for challenges
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

export interface CreateOrFetchUserMutationData {
    createOrFetchUser: UserType;
}

export interface CreateOrFetchUserMutationVariables {
    firstName: string;
    lastName: string;
    email: string;
}
