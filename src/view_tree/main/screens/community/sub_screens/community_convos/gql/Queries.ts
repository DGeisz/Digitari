import { gql } from "@apollo/client";
import { ConvoType } from "../../../../../../../global_types/ConvoTypes";

export const MAX_COMMUNITY_CONVOS_PER_PAGE = 50;

export const COMMUNITY_CONVOS = gql`
    query CommunityConvos($cmid: ID!, $lastTime: String, $tier: Int) {
        communityConvos(cmid: $cmid, lastTime: $lastTime, tier: $tier) {
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

export interface CommunityConvosData {
    communityConvos: ConvoType[];
}

export interface CommunityConvosVariables {
    cmid: string;
    lastTime?: string;
    tier?: number;
}
