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
    }
`;
