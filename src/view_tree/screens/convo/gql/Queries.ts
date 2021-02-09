import { gql } from "@apollo/client";

export const GET_CONVO = gql`
    query GetConvo($cid: ID!) {
        convo(cid: $cid) {
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
                tanony
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
