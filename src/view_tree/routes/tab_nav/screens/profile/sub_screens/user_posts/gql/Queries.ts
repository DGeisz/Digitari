import { gql } from "@apollo/client";

export const GET_USER_POSTS = gql`
    query GetUserPosts($uid: ID!, $lastTime: Int) {
        userPosts(uid: $uid, lastTime: $lastTime) {
            id
            user
            ranking
            time
            content
            link
            convoReward
            responseCost
            coin
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

export const GET_USER_POSTS_TYPE = gql`
    query GetUserPosts($uid: ID!, $lastTime: Int) {
        userPosts(uid: $uid, lastTime: $lastTime) {
            id
            user
            ranking
            time
            content
            link
            convoReward
            responseCost
            coin
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
                __typename
            }
            __typename
        }
    }
`;
