import { makePrettyNumber } from "./UserTypes";

export const CONVO_TYPENAME = "Convo";

/*
 * This is the number of messages the target user must
 * write before the source user of the convo can successfully
 * finish the conversation
 */
export const MESSAGE_COUNT_THRESHOLD = 2;
export const CONVO_ACTIVATION_COST = 5;

export const CONVO_REWARD_MULTIPLIER = 0.15;

export enum ConvoStatus {
    Deleted = -3,
    Dismissed = -2,
    Blocked,
    New,
    Active,
    Finished,
}

export interface ConvoType {
    id: string;
    pid: string;
    cmid: string;

    status: ConvoStatus;

    initialTime: string;
    initialMsg: string;

    lastTime: string;
    lastMsg: string;

    sid: string;
    stier: number;
    sranking: number;
    sname: string;
    sanony: boolean;
    sviewed: boolean;
    sourceMsgCount: number;

    tid: string;
    ttier: number;
    tranking: number;
    tname: string;
    tviewed: boolean;
    targetMsgCount: number;

    responseCost: number;
}

export enum ConvoOrder {
    time,
    ranking,
}

export interface ConvoUpdate {
    convo: ConvoType;
    tid: string;
}

export function convoReward(responseCost: number): number {
    return makePrettyNumber(CONVO_REWARD_MULTIPLIER * responseCost);
}
