import { gql } from "@apollo/client";
import { ConvoType } from "../../../../../../../../../global_types/ConvoTypes";

/*
 * Number of convos returned in each paginated page
 */
export const ACTIVE_CONVOS_PER_PAGE = 50;

export const ACTIVE_CONVOS = gql`
    query ActiveConvos($lastTime: String) {
        activeConvos(lastTime: $lastTime) {
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

export interface ActiveConvosData {
    activeConvos: ConvoType[];
}

export interface ActiveConvosVariables {
    lastTime?: string;
}
