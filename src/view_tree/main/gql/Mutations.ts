import { gql } from "@apollo/client";

export const REGISTER_PUSH = gql`
    mutation RegisterPush($token: String!) {
        registerPush(token: $token)
    }
`;

export interface RegisterPushData {
    registerPush: boolean;
}

export interface RegisterPushVariables {
    token: string;
}
