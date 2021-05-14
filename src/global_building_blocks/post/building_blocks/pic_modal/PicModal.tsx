import React from "react";
import Modal from "react-native-modal";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./PicModalStyles";

interface Props {
    url: string;
    visible: boolean;
    hide: () => void;
}

export default class PicModal extends React.PureComponent<Props> {
    render() {
        return (
            <Modal
                isVisible={this.props.visible}
                onSwipeComplete={this.props.hide}
                swipeDirection="down"
                style={styles.modal}
            >
                <TouchableOpacity
                    style={styles.outerContainer}
                    activeOpacity={1}
                    onPress={this.props.hide}
                >
                    <Image
                        source={{ uri: this.props.url }}
                        style={styles.image}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </Modal>
        );
    }
}
