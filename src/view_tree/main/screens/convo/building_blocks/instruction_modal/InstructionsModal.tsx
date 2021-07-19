import React, { useState } from "react";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../global_styles/InstructionStyles";
import TutorialModal from "../../../../../../global_building_blocks/tutorial/TutorialModal";
import { LayoutAnimation, Text, View } from "react-native";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import BoltBox from "../../../../../../global_building_blocks/bolt_box/BoltBox";
import { palette } from "../../../../../../global_styles/Palette";
import { openedFirstConvoPage } from "../../../../../../global_state/FirstImpressionsState";

enum Screens {
    Intro,
    VisibleDM,
    Finish,
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
                        setScreen(Screens.VisibleDM);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        This is a Convo! Convos are how people talk on Digitari.
                        {DOUBLE_NEWLINE}A Convo is like a mini text conversation
                        between two people about a post.
                        {DOUBLE_NEWLINE}
                        When you respond to a post, a Convo is created between
                        you and the post creator.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.VisibleDM:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Finish);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        A Convo becomes visible under its post after the post
                        creator responds. {DOUBLE_NEWLINE}
                        Because of this, you can think of Digitari Convos like
                        halfway between DMs and comment sections.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Finish:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        props.hideModal();
                        openedFirstConvoPage();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        After the other person responds twice to your Convo, you
                        can successfully finish the Convo! 🤝 {DOUBLE_NEWLINE}
                        You increase your ranking and tier by successfully
                        finishing Convos, so always be nice and respectful so
                        that the other person responds! 😊
                    </Text>
                </TutorialModal>
            );
            break;
    }

    return (
        <Modal isVisible={props.visible} style={instructionStyles.modal}>
            {modalContent}
        </Modal>
    );
};

export default InstructionsModal;
