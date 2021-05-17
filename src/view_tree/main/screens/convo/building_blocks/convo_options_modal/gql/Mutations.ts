import { gql } from "@apollo/client";

export const DELETE_CONVO = gql`
    mutation DeleteConvo($cvid: ID!) {
        deleteConvo(cvid: $cvid)
    }
`;

export interface DeleteConvoData {
    deleteConvo: boolean;
}

export interface DeleteConvoVariables {
    cvid: string;
}
