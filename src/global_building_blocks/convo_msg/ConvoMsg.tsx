import * as React from "react";
import { ConvoMsgType } from "../../global_types/ConvoMsgTypes";
import LeftConvoMsg from "./building_blocks/left_convo_msg/LeftConvoMsg";
import RightConvoMsg from "./building_blocks/right_convo_msg/RightConvoMsg";

interface Props {
    msg: ConvoMsgType;
    left: boolean;
    showUser: boolean;
    showBlockMsg: boolean;
}

const ConvoMsg: React.FC<Props> = ({ left, msg, showBlockMsg, showUser }) => {
    if (left) {
        return (
            <LeftConvoMsg
                msg={msg}
                showBlockMsg={showBlockMsg}
                showUser={showUser}
            />
        );
    } else {
        return <RightConvoMsg msg={msg} showUser={showUser} />;
    }
};

export default ConvoMsg;
