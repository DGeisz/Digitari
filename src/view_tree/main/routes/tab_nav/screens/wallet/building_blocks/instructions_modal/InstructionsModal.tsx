import React, { useState } from "react";
import Modal from "react-native-modal";
import TutorialModal from "../../../../../../../../global_building_blocks/tutorial/TutorialModal";
import { LayoutAnimation, Text } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";

enum Screens {
    Intro,
    CollectPrompt,
}

interface Props {
    hideModal: () => void;
    visible: boolean;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const [screen, setScreen] = useState<Screens>(Screens.Intro);

    let modalContent;
    switch (screen) {
        case Screens.Intro:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.CollectPrompt);
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        This is your Wallet, where all your dreams come true 🤩
                        {DOUBLE_NEWLINE}
                        Whenever you earn digicoin, it's stored here in a
                        transaction.
                        {DOUBLE_NEWLINE}
                    </Text>
                </TutorialModal>
            );
    }

    return (
        <Modal isVisible={props.visible} style={instructionStyles.modal}>
            {modalContent}
        </Modal>
    );
};

export default InstructionsModal;
