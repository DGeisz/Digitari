import { gql } from "@apollo/client";

export const GET_NEW_CONVOS = gql`
    query GetNewConvos($uid: ID!, $lastTime: Int) {
        getNewConvos(uid: $uid, lastTime: $lastTime) {
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
