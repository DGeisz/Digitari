import { gql } from "@apollo/client";

export const GET_COMMUNITY = gql`
    query GetCommunity($cmid: ID!) {
        community(cmid: $cmid) {
            id
            uid
            name
            description
            followers
            timeCreated
        }
    }
`;

export interface GetCommunityQueryData {
    community: {
        id: string;
        uid: string;
        name: string;
        description: string;
        followers: number;
        timeCreated: string;
    };
}

export interface GetCommunityQueryVariables {
    cmid: string;
}
