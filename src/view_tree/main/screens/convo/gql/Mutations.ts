import { gql } from "@apollo/client";
import { ConvoType, ConvoUpdate } from "../../../../../global_types/ConvoTypes";
import { MessageType } from "../../../../../global_types/MessageTypes";

export const MARK_CONVO_VIEWED = gql`
    mutation MarkConvoViewed($cvid: ID!) {
        markConvoViewed(cvid: $cvid) {
            id
            pid
            cmid

            status

            initialTime
            initialMsg

            lastTime
            lastMsg

            sid
            stier
            sranking
            sname
            sanony
            sviewed

            tid
            ttier
            tranking
            tname
            tviewed

            targetMsgCount
            responseCost
        }
    }
`;

export interface MarkConvoViewedData {
    markConvoViewed: ConvoType;
}

export interface MarkConvoViewedVariables {
    cvid: string;
}

export const DISMISS_CONVO = gql`
    mutation DismissConvo($cvid: ID!) {
        dismissConvo(cvid: $cvid) {
            id
            pid
            cmid

            status

            initialTime
            initialMsg

            lastTime
            lastMsg

            sid
            stier
            sranking
            sname
            sanony
            sviewed

            tid
            ttier
            tranking
            tname
            tviewed

            targetMsgCount
            responseCost
        }
    }
`;

export interface DismissConvoData {
    dismissConvo: ConvoType;
}

export interface DismissConvoVariables {
    cvid: string;
}

export const BLOCK_CONVO = gql`
    mutation BlockConvo($cvid: ID!) {
        blockConvo(cvid: $cvid) {
            convo {
                id
                pid
                cmid

                status

                initialTime
                initialMsg

                lastTime
                lastMsg

                sid
                stier
                sranking
                sname
                sanony
                sviewed

                tid
                ttier
                tranking
                tname
                tviewed

                targetMsgCount
                responseCost
            }
            tid
        }
    }
`;

export interface BlockConvoData {
    blockConvo: ConvoUpdate;
}

export interface BlockConvoVariables {
    cvid: string;
}

export const ACTIVATE_CONVO = gql`
    mutation ActivateConvo($cvid: ID!) {
        activateConvo(cvid: $cvid) {
            id
            pid
            cmid

            status

            initialTime
            initialMsg

            lastTime
            lastMsg

            sid
            stier
            sranking
            sname
            sanony
            sviewed

            tid
            ttier
            tranking
            tname
            tviewed

            targetMsgCount
            responseCost
        }
    }
`;

export interface ActivateConvoData {
    activateConvo: ConvoType;
}

export interface ActivateConvoVariables {
    cvid: string;
}

export const CREATE_MESSAGE = gql`
    mutation CreateMessage($cvid: ID!, $message: String!) {
        createMessage(cvid: $cvid, message: $message) {
            id
            uid
            tid
            user
            time
            anonymous
            content
        }
    }
`;

export interface CreateMessageData {
    createMessage: MessageType;
}

export interface CreateMessageVariables {
    cvid: string;
    message: string;
}

export const FINISH_CONVO = gql`
    mutation FinishConvo($cvid: ID!) {
        finishConvo(cvid: $cvid) {
            convo {
                id
                pid
                cmid

                status

                initialTime
                initialMsg

                lastTime
                lastMsg

                sid
                stier
                sranking
                sname
                sanony
                sviewed

                tid
                ttier
                tranking
                tname
                tviewed

                targetMsgCount
                responseCost
            }
            tid
        }
    }
`;

export interface FinishConvoData {
    finishConvo: ConvoUpdate;
}

export interface FinishConvoVariables {
    cvid: string;
}
