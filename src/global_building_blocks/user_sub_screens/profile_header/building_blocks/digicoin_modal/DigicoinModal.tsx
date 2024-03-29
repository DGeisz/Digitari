import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import { modalStyles } from "../../../../../global_styles/OptionsModalStyles";
import { DOUBLE_NEWLINE } from "../../../../../global_utils/StringUtils";
import CoinBox from "../../../../coin_box/CoinBox";

interface Props {
    visible: boolean;
    hide: () => void;
}

const DigicoinModal: React.FC<Props> = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={modalStyles.modalOuterContainer}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalHeader}>
                        <View style={modalStyles.headerBar}>
                            <CoinBox showAmount={false} coinSize={30} />
                            <Text style={modalStyles.modalHeaderText}>
                                Digicoin
                            </Text>
                            <CoinBox showAmount={false} coinSize={30} />
                        </View>
                    </View>
                    <Text style={modalStyles.modalMainText}>
                        Wanna get famous? Just create a post to unlock the true
                        power of the coin.
                        {DOUBLE_NEWLINE}
                        If you're new, the easiest way to make a bunch of coin
                        is to level up and/or invite your friends.
                        {DOUBLE_NEWLINE}
                        Otherwise, you earn digicoin rewards for every 10 posts
                        you view in your feed.
                    </Text>
                    <View style={modalStyles.modalFooter}>
                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={props.hide}
                        >
                            <Text style={modalStyles.closeButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DigicoinModal;
