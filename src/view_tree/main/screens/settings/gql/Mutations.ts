import { gql } from "@apollo/client";

export const DELETE_PUSH = gql`
    mutation DeletePush($token: String!) {
        deletePush(token: $token)
    }
`;

export interface DeletePushData {
    deletePush: boolean;
}

export interface DeletePushVariables {
    token: string;
}
