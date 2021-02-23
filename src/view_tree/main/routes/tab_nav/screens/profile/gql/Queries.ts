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

            coinSpent
            csGoal
            nextCsIndex

            postCount
            pcGoal
            nextPcIndex

            donated2Other
            d2OGoal
            nextD2OIndex

            donated2User
            d2UGoal
            nextD2UIndex

            responses2Other
            r2OGoal
            nextR2OIndex

            responses2User
            r2UGoal
            nextR2UIndex

            successfulConvos
            scGoal
            nextScIndex

            following
            fgGoal
            nextFgIndex

            followers
            fsGoal
            nextFsIndex

            followersViaLink
            fvlGoal
            nextFvlIndex

            comsCreated
            ccGoal
            nextCcIndex

            welcomeCount
            wcGoal
            nextWcIndex

            invite2ComViaLink
            i2cGoal
            nextI2CIndex
        }
    }
`;

export interface GetUserQueryData {
    user: UserType;
}

export interface GetUserQueryVariables {
    uid: string;
}

export const GET_USER_TYPE = gql`
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

            coinSpent
            csGoal
            nextCsIndex

            postCount
            pcGoal
            nextPcIndex

            donated2Other
            d2OGoal
            nextD2OIndex

            donated2User
            d2UGoal
            nextD2UIndex

            responses2Other
            r2OGoal
            nextR2OIndex

            responses2User
            r2UGoal
            nextR2UIndex

            successfulConvos
            scGoal
            nextScIndex

            following
            fgGoal
            nextFgIndex

            followers
            fsGoal
            nextFsIndex

            followersViaLink
            fvlGoal
            nextFvlIndex

            comsCreated
            ccGoal
            nextCcIndex

            welcomeCount
            wcGoal
            nextWcIndex

            invite2ComViaLink
            i2cGoal
            nextI2CIndex
            __typename
        }
    }
`;
