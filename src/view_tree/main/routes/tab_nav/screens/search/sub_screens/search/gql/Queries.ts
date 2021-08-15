import { gql } from "@apollo/client";
import {
    SearchEntityEnum,
    SearchEntityType,
} from "../../../../../../../../../global_types/SearchEntity";

export const SEARCH = gql`
    query Search($text: String!, $offset: Int, $entityType: Int) {
        search(text: $text, offset: $offset, entityType: $entityType) {
            id
            name
            followers
            imgUrl
            entityType
        }
    }
`;

export interface SearchQueryData {
    search: SearchEntityType[];
}

export interface SearchQueryVariables {
    text: string;
    offset?: number;
    entityType: SearchEntityEnum | null;
}

export const TOP_RESULTS = gql`
    query TopResults($offset: Int, $entityType: Int) {
        topResults(offset: $offset, entityType: $entityType) {
            id
            name
            followers
            imgUrl
            entityType
        }
    }
`;

export interface TopResultsData {
    topResults: SearchEntityType[];
}

export interface TopResultsVariables {
    offset?: number;
    entityType: SearchEntityEnum | null;
}
