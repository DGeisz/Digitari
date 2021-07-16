import React, { useState } from "react";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialModal from "../../../../../../../../global_building_blocks/tutorial/TutorialModal";
import { LayoutAnimation, Text } from "react-native";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";
import {
    openedFirstConvos,
    openedFirstWallet,
} from "../../../../../../../../global_state/FirstImpressionsState";

enum Screens {
    Intro,
    ExplainConvo,
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
                        setScreen(Screens.ExplainConvo);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        These are your Convos! {DOUBLE_NEWLINE}
                        When people respond to your posts, it'll show up under
                        "New." {DOUBLE_NEWLINE}
                        Your ongoing Convos with people will show up under
                        "Active."
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.ExplainConvo:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        props.hideModal();
                        openedFirstConvos();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        If you're wondering what Convos are, they're how people
                        interact on Digitari. {DOUBLE_NEWLINE}
                        Convos are like halfway between a DM and a comments
                        section. Just open any post with responses to see how
                        they work.
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
