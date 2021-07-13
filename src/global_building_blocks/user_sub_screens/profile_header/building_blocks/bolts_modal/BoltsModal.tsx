import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import { modalStyles } from "../../../../../global_styles/OptionsModalStyles";
import CoinBox from "../../../../coin_box/CoinBox";
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
                        Use digibolts to unlock profile customizations in the
                        shop or respond to posts. {DOUBLE_NEWLINE}
                        To get your hands on some digibolts, you need to grab
                        them from posts.
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
