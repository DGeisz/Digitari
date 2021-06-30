import {
    ConvoStatus,
    ConvoType,
} from "../../../../../../global_types/ConvoTypes";
import {
    localFirstName,
    localUid,
} from "../../../../../../global_state/UserState";

export const zariahConvo: ConvoType = {
    id: "tutConvo0",
    pid: "tut0",
    cmid: "",
    status: ConvoStatus.New,

    initialTime: "0",
    initialMsg: "",

    lastTime: "0",
    lastMsg: "",

    sid: localUid(),
    stier: 0,
    sranking: 0,
    sname: localFirstName(),
    sanony: false,
    sviewed: true,

    tid: "z",
    ttier: 0,
    tranking: 0,
    tname: "Zariah",
    tviewed: true,

    targetMsgCount: 0,
    sourceMsgCount: 0,
    responseCost: 10,
};
