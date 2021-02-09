import { gql } from "@apollo/client";

export const GET_CHALLENGES = gql`
    query GetChallenges {
        challenges {
            index
            tier
            class
            description
            coinReward
            goal
        }
    }
`;

export const GET_CHALLENGES_TYPE = gql`
    query GetChallenges {
        challenges {
            index
            tier
            class
            description
            coinReward
            goal
            __typename
        }
    }
`;
