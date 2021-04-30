import React from "react";
import Modal from "react-native-modal";
import { View } from "react-native";

interface Props {
    visible: boolean;
}

export default class DonationModal extends React.PureComponent<Props> {
    render() {
        return (
            <Modal isVisible={this.props.visible}>
                <View />
            </Modal>
        );
    }
}
