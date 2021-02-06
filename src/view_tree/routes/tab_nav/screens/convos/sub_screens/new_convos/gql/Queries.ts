import { schema } from "../../../../../../../../global_gql/Schema";
import { gql } from "@apollo/client";

export const GET_NEW_CONVOS = gql`
    query GetNewConvos($uid: ID!, $lastTime: Int) {
        getNewConvos(uid: $uid, lastTime: $lastTime) {
            id
            user
            time
            msg
        }
    }
`;
