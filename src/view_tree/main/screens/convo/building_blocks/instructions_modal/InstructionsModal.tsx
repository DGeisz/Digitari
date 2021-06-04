import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../global_styles/InstructionStyles";
import IntroduceConvo from "./sub_screens/introduce_convo/IntroduceConvo";
import ExplainConvo from "./sub_screens/explain_convo/ExplainConvo";
import PromptReply from "./sub_screens/prompt_reply/PromptReply";
import PromptFinish from "./sub_screens/prompt_finish/PromptFinish";
import ExplainSuccess from "./sub_screens/explain_success/ExplainSuccess";

const InstructionsModal: React.FC = () => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.InputResponse:
            currentScreen = <IntroduceConvo />;
            break;
        case TutorialScreen.ExplainConvo:
            currentScreen = <ExplainConvo />;
            break;
        case TutorialScreen.PromptReply:
            currentScreen = <PromptReply />;
            break;
        case TutorialScreen.PromptFinish:
            currentScreen = <PromptFinish />;
            break;
        case TutorialScreen.ExplainSuccess:
            currentScreen = <ExplainSuccess />;
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
