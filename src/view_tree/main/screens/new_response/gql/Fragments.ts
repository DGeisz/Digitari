import { gql } from "@apollo/client";

export const NEW_RESPONSE_CONVO = gql`
    fragment NewResponseConvo on Convo {
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
`;
