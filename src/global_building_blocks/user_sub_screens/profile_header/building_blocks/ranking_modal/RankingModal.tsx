import React from "react";
import Modal from "react-native-modal";
import { modalStyles } from "../../../../../global_styles/OptionsModalStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { DOUBLE_NEWLINE } from "../../../../../global_utils/StringUtils";

interface Props {
    visible: boolean;
    hide: () => void;
}

const RankingModal: React.FC<Props> = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={modalStyles.modalOuterContainer}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalHeader}>
                        <Text style={modalStyles.modalHeaderText}>Ranking</Text>
                    </View>
                    <Text style={modalStyles.modalMainText}>
                        You increase your Digitari ranking by being a good
                        person. Isn't that fun! 😊 {DOUBLE_NEWLINE}
                        More specifically, your ranking goes up when you have
                        good interactions with other people on Digitari.{" "}
                        {DOUBLE_NEWLINE}
                        For the exact calculation of your ranking, go to your
                        "Stats" tab and hit the info button next to "Tier
                        Breakdown."
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

export default RankingModal;
