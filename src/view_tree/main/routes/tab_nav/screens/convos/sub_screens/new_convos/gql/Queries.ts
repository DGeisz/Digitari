import { gql } from "@apollo/client";

export const GET_NEW_CONVOS = gql`
    query GetNewConvos($uid: ID!, $lastTime: Int) {
        newConvos(uid: $uid, lastTime: $lastTime) {
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

export const GET_NEW_CONVOS_TYPE = gql`
    query GetNewConvos($uid: ID!, $lastTime: Int) {
        newConvos(uid: $uid, lastTime: $lastTime) {
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