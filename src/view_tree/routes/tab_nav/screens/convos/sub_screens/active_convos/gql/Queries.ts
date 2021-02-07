import { gql } from "@apollo/client";

export const GET_ACTIVE_CONVOS = gql`
    query GetActiveConvos($uid: ID!, $lastTime: Int) {
        getActiveConvos(uid: $uid, lastTime: $lastTime) {
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
