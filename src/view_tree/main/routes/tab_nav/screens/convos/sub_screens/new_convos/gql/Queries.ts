import { gql } from "@apollo/client";
import {
    ConvoOrder,
    ConvoType,
} from "../../../../../../../../../global_types/ConvoTypes";

export const NEW_CONVOS = gql`
    query NewConvos($orderType: Int!, $lastTime: String) {
        newConvos(orderingType: $orderType, lastTime: $lastTime) {
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

export interface NewConvosData {
    newConvos: ConvoType[];
}

export interface NewConvosVariables {
    orderingType: ConvoOrder;
    lastTime?: string;
}

// export const GET_NEW_CONVOS = gql`
//     query GetNewConvos($uid: ID!, $lastTime: Int) {
//         newConvos(uid: $uid, lastTime: $lastTime) {
//             id
//             pid
//
//             time
//             msg
//
//             sid
//             sranking
//             sname
//             sanony
//             sviewed
//
//             tid
//             tranking
//             tname
//             tviewed
//         }
//     }
// `;
//
// export const GET_NEW_CONVOS_TYPE = gql`
//     query GetNewConvos($uid: ID!, $lastTime: Int) {
//         newConvos(uid: $uid, lastTime: $lastTime) {
//             id
//             pid
//
//             time
//             msg
//
//             sid
//             sranking
//             sname
//             sanony
//             sviewed
//
//             tid
//             tranking
//             tname
//             tviewed
//             __typename
//         }
//     }
// `;
