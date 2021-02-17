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

            newUser

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

export interface CreateOrFetchUserMutationData {
    createOrFetchUser: UserType;
}

export interface CreateOrFetchUserMutationVariables {
    firstName: string;
    lastName: string;
    email: string;
}
