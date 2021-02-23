import { gql } from "@apollo/client";

export const GET_USER_CONVOS = gql`
    query GetUserConvos($uid: ID!, $lastTime: Int) {
        userConvos(uid: $uid, lastTime: $lastTime) {
            id
            pid

            time
            msg

            sid
            sranking
            sname
            sanony
            sviewed

            tid
            tranking
            tname
            tviewed
        }
    }
`;

export const GET_USER_CONVOS_TYPE = gql`
    query GetUserConvos($uid: ID!, $lastTime: Int) {
        userConvos(uid: $uid, lastTime: $lastTime) {
            id
            pid

            time
            msg

            sid
            sranking
            sname
            sanony
            sviewed

            tid
            tranking
            tname
            tviewed
            __typename
        }
    }
`;
