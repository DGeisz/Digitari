import { gql } from "@apollo/client";
import { CommunityType } from "../../../../../../../global_types/CommunityTypes";

export const CREATE_COMMUNITY = gql`
    mutation CreateCommunity($name: String, $description: String) {
        createCommunity(name: $name, description: $description) {
            id
            uid
            name
            amFollowing
            description
            followers
            timeCreated
        }
    }
`;

export interface CreateCommunityMutationData {
    createCommunity: CommunityType;
}

export interface CreateCommunityMutationVariables {
    name: string;
    description: string;
}

export const CREATE_COMMUNITY_FRAGMENT = gql`
    fragment CommunityCreated on Community {
        id
        uid
        name
        amFollowing
        description
        followers
        timeCreated
    }
`;
