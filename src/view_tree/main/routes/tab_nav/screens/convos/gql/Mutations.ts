import { gql } from "@apollo/client";

export const VIEWED_CONVOS = gql`
    mutation ViewConvos {
        viewedConvoUpdate
    }
`;

export interface ViewConvosData {
    viewedConvoUpdate: boolean;
}
