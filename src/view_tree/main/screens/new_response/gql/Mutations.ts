import { gql } from "@apollo/client";
import { ConvoType } from "../../../../../global_types/ConvoTypes";

export const CREATE_CONVO = gql`
    mutation CreateConvo($pid: ID, $message: String, $anonymous: Boolean) {
        createConvo(pid: $pid, message: $message, anonymous: $anonymous) {
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

export interface CreateConvoData {
    createConvo: ConvoType;
}

export interface CreateConvoVariables {
    pid: string;
    message: string;
    anonymous: boolean;
}
