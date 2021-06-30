import React from "react";
import LeftConvoMsg from "./building_blocks/left_convo_msg/LeftConvoMsg";
import RightConvoMsg from "./building_blocks/right_convo_msg/RightConvoMsg";
import { MessageType } from "../../global_types/MessageTypes";

interface Props {
    msg: MessageType;
    left: boolean;
    showUser: boolean;
    showBlockMsg: boolean;
    onBlock: () => void;
    animateMsg: boolean;
}

export default class ConvoMsg extends React.PureComponent<Props> {
    static defaultProps = {
        onBlock: () => {},
    };

    render() {
        if (this.props.left) {
            return (
                <LeftConvoMsg
                    animateMsg={this.props.animateMsg}
                    msg={this.props.msg}
                    showBlockMsg={this.props.showBlockMsg}
                    showUser={this.props.showUser}
                    onBlock={this.props.onBlock}
                />
            );
        } else {
            return (
                <RightConvoMsg
                    animateMsg={this.props.animateMsg}
                    msg={this.props.msg}
                    showUser={this.props.showUser}
                />
            );
        }
    }
}
