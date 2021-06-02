import React, { useContext } from "react";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../context/tutorial_context/TutorialContext";
import Welcome from "./sub_screens/welcome/Welcome";
import ProfileDescription from "./sub_screens/profile_description/ProfileDescription";
import OpenTierPrompt from "./sub_screens/open_tier_prompt/OpenTierPrompt";
import { View } from "react-native";
import OpenWalletPrompt from "./sub_screens/open_wallet_prompt/OpenWalletPrompt";

const InstructionModal: React.FC = () => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.Welcome:
            currentScreen = <Welcome />;
            break;
        case TutorialScreen.ProfileDescription:
            currentScreen = <ProfileDescription />;
            break;
        case TutorialScreen.OpenTierPrompt:
            currentScreen = <OpenTierPrompt />;
            break;
        case TutorialScreen.OpenWalletPrompt:
            currentScreen = <OpenWalletPrompt />;
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
