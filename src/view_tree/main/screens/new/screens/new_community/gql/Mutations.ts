import { gql } from "@apollo/client";

export const CREATE_COMMUNITY = gql`
    mutation CreateCommunity($name: String, $description: String) {
        createCommunity(name: $name, description: $description) {
            id
            uid
            name
            description
            followers
            timeCreated
        }
    }
`;

export interface CreateCommunityMutationData {
    createCommunity: {
        id: string;
        uid: string;
        name: string;
        description: string;
        followers: number;
        timeCreated: string;
    };
}

export interface CreateCommunityMutationVariables {
    name: string;
    description: string;
}
