import { schema } from "../../../../../../global_gql/Schema";
import { gql } from "@apollo/client";

export const GET_FEED = gql`
    query GetFeed($uid: ID!, $lastTime: Int) {
        getFeed(uid: $uid, lastTime: $lastTime) {
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

export const GET_FEED_TYPE = gql`
    query GetFeed($uid: ID!, $lastTime: Int) {
        getFeed(uid: $uid, lastTime: $lastTime) {
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
                __typename
            }
            __typename
        }
    }
`;
