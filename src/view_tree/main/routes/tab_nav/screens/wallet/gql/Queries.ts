import { gql } from "@apollo/client";

export const GET_WALLET = gql`
    query GetWallet($id: ID!) {
        wallet(id: $id) {
            id
            sum
            expirationTime
            entries {
                time
                content
                coin
                entryType
                meta
            }
        }
    }
`;

export const GET_WALLET_TYPE = gql`
    query GetWallet($id: ID!) {
        wallet(id: $id) {
            id
            sum
            expirationTime
            entries {
                time
                content
                coin
                entryType
                meta
                __typename
            }
            __typename
        }
    }
`;
