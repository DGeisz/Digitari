import { gql } from "@apollo/client";
import { MessageType } from "../../../../../global_types/MessageTypes";
import { ConvoType, ConvoUpdate } from "../../../../../global_types/ConvoTypes";
import { FollowEntityType } from "../../../../../global_types/FollowEntityType";

/*
 * New message
 */
export const NEW_MESSAGE_ADDED = gql`
    subscription NewMessageAdded($tid: ID!) {
        messageAdded(tid: $tid) {
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

export interface NewMessageAddedData {
    messageAdded: MessageType;
}

export interface NewMessageAddedVariables {
    tid: string;
}

/*
 * Convo dismissed
 */
export const CONVO_DISMISSED = gql`
    subscription ConvoDismissed($sid: ID!) {
        convoDismissed(sid: $sid) {
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

export interface ConvoDismissedData {
    convoDismissed: ConvoType;
}

export interface ConvoDismissedVariables {
    sid: string;
}

/*
 * Convo blocked
 */
export const CONVO_BLOCKED = gql`
    subscription ConvoBlocked($tid: ID!) {
        convoBlocked(tid: $tid) {
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
                convoReward
            }
            tid
        }
    }
`;

export interface ConvoBlockedData {
    convoBlocked: ConvoUpdate;
}

export interface ConvoBlockedVariables {
    tid: string;
}

/*
 * Convo activated
 */
export const CONVO_ACTIVATED = gql`
    subscription ConvoActivated($sid: ID!) {
        convoActivated(sid: $sid) {
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

export interface ConvoActivatedData {
    convoActivated: ConvoType;
}

export interface ConvoActivatedVariables {
    sid: string;
}

/*
 * Convo created
 */
export const CONVO_CREATED = gql`
    subscription ConvoCreated($tid: ID!) {
        convoCreated(tid: $tid) {
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

export interface ConvoCreatedData {
    convoCreated: ConvoType;
}

export interface ConvoCreatedVariables {
    tid: string;
}

/*
 * Convo finished
 */
export const CONVO_FINISHED = gql`
    subscription ConvoFinished($tid: ID!) {
        convoFinished(tid: $tid) {
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
                convoReward
            }
            tid
        }
    }
`;

export interface ConvoFinishedData {
    convoFinished: ConvoUpdate;
}

export interface ConvoFinishedVariables {
    tid: string;
}

/*
 * New follower
 */
export const NEW_FOLLOWER = gql`
    subscription NewFollower($tid: ID!) {
        newFollower(tid: $tid) {
            sid
            tid
            time
            name
            imgUrl
            entityType
        }
    }
`;

export interface NewFollowerData {
    newFollower: FollowEntityType;
}

export interface NewFollowerVariables {
    tid: string;
}

/*
 * New community follower
 */
export const NEW_COMMUNITY_FOLLOWER = gql`
    subscription NewCommunityFollower($tuid: ID!) {
        newCommunityFollower(tuid: $tuid) {
            sid
            tid
            tuid
            time
            name
            imgUrl
            entityType
        }
    }
`;

export interface NewCommunityFollowerData {
    newCommunityFollower: FollowEntityType;
}

export interface NewCommunityFollowerVariables {
    tuid: string;
}
