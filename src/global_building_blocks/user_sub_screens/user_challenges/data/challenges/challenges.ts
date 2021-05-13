import {
    ChallengeClass,
    ChallengeType,
} from "../../../../../global_types/ChallengeTypes";
import { generateFollowersChallenge } from "../../../../../global_gql/challenge_check/challenge_handlers/followers/followers";
import { generateCommunityFollowersChallenge } from "../../../../../global_gql/challenge_check/challenge_handlers/community_followers/community_followers";
import { generateFollowingChallenge } from "../../../../../global_gql/challenge_check/challenge_handlers/following/following";
import { generateRfcChallenge } from "../../../../../global_gql/challenge_check/challenge_handlers/received_from_convos/received_from_convos";
import { generateSocChallenge } from "../../../../../global_gql/challenge_check/challenge_handlers/spent_on_convos/spent_on_convos";
import { generatePostCountChallenge } from "../../../../../global_gql/challenge_check/challenge_handlers/post_count/post_count";
import { generateScChallenge } from "../../../../../global_gql/challenge_check/challenge_handlers/successful_convos/successful_convos";

function genChallengeCluster(challengeClass: ChallengeClass): ChallengeType[] {
    return [
        generateFollowersChallenge(challengeClass),
        generateCommunityFollowersChallenge(challengeClass),
        generateFollowingChallenge(challengeClass),
        generateRfcChallenge(challengeClass),
        generateSocChallenge(challengeClass),
        generatePostCountChallenge(challengeClass),
        generateScChallenge(challengeClass),
    ];
}

export const challenges: ChallengeType[] = [
    /*
     * Bronze challenges
     */
    ...genChallengeCluster(ChallengeClass.Bronze),
    /*
     * Silver challenges
     */
    ...genChallengeCluster(ChallengeClass.Silver),
    /*
     * Gold challenges
     */
    ...genChallengeCluster(ChallengeClass.Gold),
    /*
     * Supreme challenges
     */
    ...genChallengeCluster(ChallengeClass.Supreme),
];
