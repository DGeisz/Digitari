import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../tutorial/context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../global_styles/InstructionStyles";
import TutorialModal from "../../../../../tutorial/building_blocks/tutorial_modal/TutorialModal";
import {
    explainIdentityContent,
    promptResponseMessageContent,
} from "../../../../../tutorial/screens/tutorial_screens/TutorialScreens";

interface Props {
    goBack: () => void;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.ExplainIdentity:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBack={props.goBack}
                    goBackScreen={TutorialScreen.RespondToPost}
                    content={explainIdentityContent}
                />
            );
            break;
        case TutorialScreen.PromptResponseMessage:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ExplainIdentity}
                    content={promptResponseMessageContent}
                />
            );
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
