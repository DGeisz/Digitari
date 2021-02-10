import * as React from "react";
import { ConvoMsgType } from "../../global_types/ConvoMsgTypes";
import LeftConvoMsg from "./building_blocks/left_convo_msg/LeftConvoMsg";
import RightConvoMsg from "./building_blocks/right_convo_msg/RightConvoMsg";

interface Props {
    msg: ConvoMsgType;
    left: boolean;
    showUser: boolean;
    showBlockMsg: boolean;
    onBlock: () => void;
    blockMessage: string;
}

export default class ConvoMsg extends React.PureComponent<Props> {
    static defaultProps = {
        onBlock: () => {},
        blockMessage: "",
    };

    render() {
        if (this.props.left) {
            return (
                <LeftConvoMsg
                    msg={this.props.msg}
                    showBlockMsg={this.props.showBlockMsg}
                    showUser={this.props.showUser}
                    onBlock={this.props.onBlock}
                    blockMessage={this.props.blockMessage}
                />
            );
        } else {
            return (
                <RightConvoMsg
                    msg={this.props.msg}
                    showUser={this.props.showUser}
                />
            );
        }
    }
}
