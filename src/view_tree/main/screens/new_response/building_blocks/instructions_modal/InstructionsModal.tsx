import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../global_styles/InstructionStyles";
import ExplainIdentity from "./sub_screens/explain_identity/ExplainIdentity";
import PromptResponseMessage from "./sub_screens/prompt_response_message/PromptResponseMessage";

const InstructionsModal: React.FC = () => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.ExplainIdentity:
            console.log("We're explaining identity");
            currentScreen = <ExplainIdentity />;
            break;
        case TutorialScreen.PromptResponseMessage:
            currentScreen = <PromptResponseMessage />;
            break;
        default:
            modalVisible = false;
    }

    return (
        <Modal
            isVisible={modalVisible}
            style={instructionStyles.modal}
            backdropOpacity={0.5}
        >
            {currentScreen}
        </Modal>
    );
};

export default InstructionsModal;
