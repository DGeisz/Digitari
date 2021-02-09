import { gql } from "@apollo/client";

export const GET_FEED = gql`
    query GetFeed($uid: ID!, $lastTime: Int) {
        feed(uid: $uid, lastTime: $lastTime) {
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

export const GET_FEED_TYPE = gql`
    query GetFeed($uid: ID!, $lastTime: Int) {
        feed(uid: $uid, lastTime: $lastTime) {
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
