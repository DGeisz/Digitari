import { gql } from "@apollo/client";

export const GET_CONVO = gql`
    query GetConvo($cid: ID!) {
        convo(cid: $cid) {
            id
            status
            post {
                id
                uid
                user
                ranking
                time
                content
                link
                convoReward
            }
            cover {
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
                tviewed
            }
            messages {
                id
                uid
                user
                time
                anonymous
                content
            }
        }
    }
`;

export const GET_CONVO_TYPE = gql`
    query GetConvo($cid: ID!) {
        convo(cid: $cid) {
            id
            status
            post {
                id
                uid
                user
                ranking
                time
                content
                link
                convoReward
                __typename
            }
            cover {
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
                tviewed
                __typename
            }
            messages {
                id
                uid
                user
                time
                anonymous
                content
                __typename
            }
            __typename
        }
    }
`;
