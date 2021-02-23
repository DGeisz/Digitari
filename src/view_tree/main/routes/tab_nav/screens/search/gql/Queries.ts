import { gql } from "@apollo/client";
import { SearchEntityType } from "../../../../../../../global_types/SearchEntity";

export const SEARCH = gql`
    query Search($text: String!) {
        search(text: $text) {
            id
            name
            followers
            entityType
        }
    }
`;

export interface SearchQueryData {
    search: SearchEntityType[];
}

export interface SearchQueryVariables {
    text: string;
}
