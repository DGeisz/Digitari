import { gql } from "@apollo/client";
import { CommunityType } from "../../../../../global_types/CommunityTypes";

export const GET_COMMUNITY = gql`
    query GetCommunity($cmid: ID!) {
        community(cmid: $cmid) {
            id
            amFollowing
            uid
            name
            description
            followers
            timeCreated
        }
    }
`;

export interface GetCommunityQueryData {
    community: CommunityType;
}

export interface GetCommunityQueryVariables {
    cmid: string;
}
