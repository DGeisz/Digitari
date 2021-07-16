import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import { modalStyles } from "../../../../../global_styles/OptionsModalStyles";
import { DOUBLE_NEWLINE } from "../../../../../global_utils/StringUtils";
import BoltBox from "../../../../bolt_box/BoltBox";

interface Props {
    visible: boolean;
    hide: () => void;
}

const BoltsModal: React.FC<Props> = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={modalStyles.modalOuterContainer}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalHeader}>
                        <View style={modalStyles.headerBar}>
                            <BoltBox
                                showAmount={false}
                                boltSize={30}
                                amount={0}
                            />
                            <Text style={modalStyles.modalHeaderText}>
                                Digibolts
                            </Text>
                            <BoltBox
                                showAmount={false}
                                boltSize={30}
                                amount={0}
                            />
                        </View>
                    </View>
                    <Text style={modalStyles.modalMainText}>
                        Digibolts add extra pizazz to Digitari 🥳
                        {DOUBLE_NEWLINE}
                        You'll need digibolts to unlock items in the shop, but
                        you can also use them to respond to posts.
                        {DOUBLE_NEWLINE}
                        Each post has a couple digibolts that you can collect,
                        so head over to your feed and go crazy, kid.
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

export default BoltsModal;
