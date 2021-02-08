import { gql } from "@apollo/client";

export const GET_CHALLENGES = gql`
    query GetChallenges {
        challenges {
            index
            class
            description
            coinReward
            goal
        }
    }
`;
