import { gql } from "@apollo/client";
import { ConvoType } from "../../../../global_types/ConvoTypes";

export const USER_CONVOS_PER_PAGE = 50;

export const USER_CONVOS = gql`
    query UserConvos($uid: ID!, $lastTime: String) {
        userConvos(uid: $uid, lastTime: $lastTime) {
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
            convoReward
        }
    }
`;

export interface UserConvosData {
    userConvos: ConvoType[];
}

export interface UserConvosVariables {
    uid: string;
    lastTime?: string;
}
