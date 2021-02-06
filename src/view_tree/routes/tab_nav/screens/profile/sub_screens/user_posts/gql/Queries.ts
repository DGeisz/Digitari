import { schema } from "../../../../../../../../global_gql/Schema";
import { gql } from "@apollo/client";

export const GET_USER_POSTS = gql`
    query GetUserPosts($uid: ID!, $lastTime: Int) {
        getUserPosts(uid: $uid, lastTime: $lastTime) {
            id
            user
            ranking
            time
            content
            link
            convoReward
            responseCost
            coin
            convoCount
            responseCount
            coinDonated
            convos {
                id
                user
                time
                msg
            }
        }
    }
`;
