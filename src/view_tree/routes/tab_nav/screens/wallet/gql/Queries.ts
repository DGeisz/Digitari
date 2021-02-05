import { schema } from "../../../../../../global_gql/Schema";
import { gql } from "@apollo/client";

export const GET_WALLET = gql`
    query GetWallet($id: ID!) {
        getWallet(id: $id) {
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
