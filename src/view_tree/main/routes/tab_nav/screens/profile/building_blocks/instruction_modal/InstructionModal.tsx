import React, { useContext } from "react";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import { View } from "react-native";
import TutorialModal from "../../../../../../../tutorial/building_blocks/tutorial_modal/TutorialModal";
import {
    openTierPromptContent,
    openWalletPromptContent,
    profileDescriptionContent,
    welcomeContent,
} from "../../../../../../../tutorial/screens/tutorial_screens/TutorialScreens";

const InstructionModal: React.FC = () => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.Welcome:
            currentScreen = (
                <TutorialModal
                    goBackScreen={TutorialScreen.Welcome}
                    content={welcomeContent}
                    top
                    showGoBack={false}
                />
            );
            break;
        case TutorialScreen.ProfileDescription:
            currentScreen = (
                <TutorialModal
                    goBackScreen={TutorialScreen.Welcome}
                    content={profileDescriptionContent}
                    top={false}
                />
            );
            break;
        case TutorialScreen.OpenTierPrompt:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ProfileDescription}
                    content={openTierPromptContent}
                />
            );
            break;
        case TutorialScreen.OpenWalletPrompt:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.OpenTierPrompt}
                    content={openWalletPromptContent}
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

export default InstructionModal;
