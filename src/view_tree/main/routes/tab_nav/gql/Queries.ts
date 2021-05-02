import { gql } from "@apollo/client";

export const GET_UPDATE_FLAGS = gql`
    query GetUpdateFlags($uid: ID!) {
        user(uid: $uid) {
            id
            ranking
            lastCollectionTime
            newConvoUpdate
            newTransactionUpdate
        }
    }
`;

export interface GetUpdateFlagsData {
    user: {
        id: string;
        ranking: number;
        lastCollectionTime: string;
        newConvoUpdate: boolean;
        newTransactionUpdate: boolean;
    };
}

export interface GetUpdateFlagsVariables {
    uid: string;
}
