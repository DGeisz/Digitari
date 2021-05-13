import { gql } from "@apollo/client";
import { UserType } from "../../../global_types/UserTypes";

export const CHALLENGE_USER = gql`
    query ChallengeUser($uid: ID!) {
        user(uid: $uid) {
            id

            challengeReceipts

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
        }
    }
`;

export interface ChallengeUserData {
    user: UserType;
}

export interface ChallengeUserVariables {
    uid: string;
}
