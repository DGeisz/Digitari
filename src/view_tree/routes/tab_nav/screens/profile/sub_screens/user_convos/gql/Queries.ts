import { schema } from "../../../../../../../../global_gql/Schema";
import { gql } from "@apollo/client";

export const GET_USER_CONVOS = gql`
    query GetUserConvos($uid: ID!, $lastTime: Int) {
        getUserConvos(uid: $uid, lastTime: $lastTime) {
            id
            user
            time
            msg
        }
    }
`;
