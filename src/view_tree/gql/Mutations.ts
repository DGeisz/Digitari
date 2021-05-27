import { gql } from "@apollo/client";
import { UserType } from "../../global_types/UserTypes";

/*
 * User check in
 */
export const CHECK_IN_USER = gql`
    mutation CheckInUser {
        checkInUser {
            id
            firstName
            lastName
            email
            timeCreated
            imgUrl

            lastCollectionTime

            # Indicates whether the person who fetched this user is following this user.
            amFollowing

            newConvoUpdate
            newTransactionUpdate

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

export interface CheckInUserData {
    checkInUser?: UserType;
}

export interface CheckInUserVariables {}

/*
 * Create user
 */
export const CREATE_USER = gql`
    mutation CreateUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $code: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            code: $code
        ) {
            id
            firstName
            lastName
            email
            timeCreated
            imgUrl

            lastCollectionTime

            # Indicates whether the person who fetched this user is following this user.
            amFollowing

            newConvoUpdate
            newTransactionUpdate

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

export interface CreateUserData {
    createUser: UserType;
}

export interface CreateUserVariables {
    firstName: string;
    lastName: string;
    email: string;
    code: string;
}

export const PROCESS_IAP = gql`
    mutation ProcessIap(
        $productId: String!
        $receipt: String!
        $ios: Boolean!
    ) {
        processIap(productId: $productId, receipt: $receipt, ios: $ios)
    }
`;

export interface ProcessIapData {
    processIap: boolean;
}

export interface ProcessIapVariables {
    productId: string;
    receipt: string;
    ios: boolean;
}

/*
 * DEPRECATED -- Create or fetch user
 */
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
            email
            timeCreated
            imgUrl

            lastCollectionTime

            # Indicates whether the person who fetched this user is following this user.
            amFollowing

            newConvoUpdate
            newTransactionUpdate

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
