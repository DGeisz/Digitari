import { gql } from "@apollo/client";
import { ConvoType } from "../../../../global_types/ConvoTypes";

export const NEW_CONVO = gql`
    mutation NewConvo($pid: ID!, $sanony: Boolean!, $msg: String!) {
        newConvo(pid: $pid, sanony: $sanony, msg: $msg) {
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

export const NEW_CONVO_TYPE = gql`
    mutation NewConvo($pid: ID!, $sanony: Boolean!, $msg: String!) {
        newConvo(pid: $pid, sanony: $sanony, msg: $msg) {
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
        }
    }
`;

export interface NewResponseMutationData {
    newConvo: ConvoType;
}

export interface NewResponseMutationVariables {
    pid: string;
    sanony: boolean;
    msg: string;
}
