import { gql } from "@apollo/client";
import { ConvoType } from "../../../../../global_types/ConvoTypes";

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
        }
    }
`;

export interface BlockConvoData {
    blockConvo: ConvoType;
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
        }
    }
`;

export interface ActivateConvoData {
    activateConvo: ConvoType;
}

export interface ActivateConvoVariables {
    cvid: string;
}
