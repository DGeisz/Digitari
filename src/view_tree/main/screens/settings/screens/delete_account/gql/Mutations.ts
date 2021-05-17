import { gql } from "@apollo/client";

export const DELETE_ACCOUNT = gql`
    mutation DeleteAccount {
        deleteUser
    }
`;

export interface DeleteAccountData {
    deleteUser: boolean;
}

export interface DeleteAccountVariables {}
