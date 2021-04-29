import { gql } from "@apollo/client";
import {
    ConvoOrder,
    ConvoType,
} from "../../../../../../../../../global_types/ConvoTypes";

export const NEW_CONVOS_PER_PAGE = 50;

export const NEW_CONVOS = gql`
    query NewConvos($orderingType: Int, $offset: Int) {
        newConvos(orderingType: $orderingType, offset: $offset) {
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

export interface NewConvosData {
    newConvos: ConvoType[];
}

export interface NewConvosVariables {
    orderingType: ConvoOrder;
    offset?: number;
}
