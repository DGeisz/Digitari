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
