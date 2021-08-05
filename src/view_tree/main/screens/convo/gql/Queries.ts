import { gql } from "@apollo/client";
import { ConvoType } from "../../../../../global_types/ConvoTypes";
import { PostType } from "../../../../../global_types/PostTypes";
import { MessageType } from "../../../../../global_types/MessageTypes";

export const CONVO = gql`
    query Convo($cvid: ID!) {
        convo(cvid: $cvid) {
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
            sourceMsgCount

            tid
            ttier
            tranking
            tname
            tviewed
            targetMsgCount
        }
    }
`;

export interface ConvoData {
    convo: ConvoType;
}

export interface ConvoVariables {
    cvid: string;
}

export const CONVO_POST = gql`
    query Post($pid: ID!) {
        post(pid: $pid) {
            id
            uid
            userPic

            nameColor
            nameFont
            sticker

            # Main content
            user
            tier
            time
            content
            boltsBought

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

export interface ConvoPostData {
    post: PostType;
}

export interface ConvoPostVariables {
    pid: string;
}

export const CONVO_MESSAGES = gql`
    query ConvoMessages($cvid: ID!, $lastTime: String) {
        convoMessages(cvid: $cvid, lastTime: $lastTime) {
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

export interface ConvoMessagesData {
    convoMessages: MessageType[];
}

export interface ConvoMessagesVariables {
    cvid: string;
    lastTime?: string;
}

export const MAX_CONVO_MESSAGES_PER_PAGE = 50;
