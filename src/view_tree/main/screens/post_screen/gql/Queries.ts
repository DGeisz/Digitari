import { gql } from "@apollo/client";
import { PostType } from "../../../../../global_types/PostTypes";
import { ConvoOrder, ConvoType } from "../../../../../global_types/ConvoTypes";

export const POST_CONVOS_PER_PAGE = 50;

export const POST = gql`
    query Post($pid: ID!) {
        post(pid: $pid) {
            id
            uid

            nameColor
            nameFont

            # Main content
            user
            tier
            time
            content

            # Add on
            addOn
            addOnContent
            target
            cmid
            communityName

            # Coin fields
            responseCost
            coin

            # Convos
            convoCount
            responseCount
        }
    }
`;

export interface PostData {
    post: PostType;
}

export interface PostVariables {
    pid: string;
}

export const POST_CONVOS = gql`
    query PostConvos($pid: ID!, $orderingType: Int!, $offet: Int) {
        postConvos(pid: $pid, orderingType: $orderingType, offset: $offet) {
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

export interface PostConvosData {
    postConvos: ConvoType[];
}

export interface PostConvosVariables {
    pid: string;
    orderingType: ConvoOrder;
    offset?: number;
}
