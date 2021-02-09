import { gql } from "@apollo/client";

export const GET_ACTIVE_CONVOS = gql`
    query GetActiveConvos($uid: ID!, $lastTime: Int) {
        activeConvos(uid: $uid, lastTime: $lastTime) {
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
            tanony
            tviewed
        }
    }
`;

export const GET_ACTIVE_CONVOS_TYPE = gql`
    query GetActiveConvos($uid: ID!, $lastTime: Int) {
        activeConvos(uid: $uid, lastTime: $lastTime) {
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
            tanony
            tviewed
            __typename
        }
    }
`;
