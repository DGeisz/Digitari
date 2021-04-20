import { gql } from "@apollo/client";
import {
    SearchEntityEnum,
    SearchEntityType,
} from "../../../../../../../global_types/SearchEntity";

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
