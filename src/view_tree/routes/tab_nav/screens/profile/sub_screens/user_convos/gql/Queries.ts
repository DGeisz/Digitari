import { gql } from "@apollo/client";

export const GET_USER_CONVOS = gql`
    query GetUserConvos($uid: ID!, $lastTime: Int) {
        getUserConvos(uid: $uid, lastTime: $lastTime) {
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
