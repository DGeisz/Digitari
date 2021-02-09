import { gql } from "@apollo/client";

export const GET_POST = gql`
    query GetPost($pid: ID!) {
        post(pid: $pid) {
            id
            uid
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

export const GET_POST_TYPE = gql`
    query GetPost($pid: ID!) {
        post(pid: $pid) {
            id
            uid
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
