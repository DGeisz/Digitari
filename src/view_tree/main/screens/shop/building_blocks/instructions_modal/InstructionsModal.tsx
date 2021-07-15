import React from "react";
import { LayoutAnimation, Text } from "react-native";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../global_styles/InstructionStyles";
import TutorialModal from "../../../../../../global_building_blocks/tutorial/TutorialModal";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import { openedFirstShop } from "../../../../../../global_state/FirstImpressionsState";

interface Props {
    hideModal: () => void;
    visible: boolean;
}

const InstructionsModal: React.FC<Props> = (props) => {
    return (
        <Modal isVisible={props.visible} style={instructionStyles.modal}>
            <TutorialModal
                top={false}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    props.hideModal();
                    openedFirstShop();
                }}
            >
                <Text style={instructionStyles.instructionText}>
                    Welcome to the Shop, my friend!
                    {DOUBLE_NEWLINE}
                    Use digibolts you've collected from posts to unlock all
                    sorts of goodies and profile customizations in the Shop.
                </Text>
            </TutorialModal>
        </Modal>
    );
};

export default InstructionsModal;
