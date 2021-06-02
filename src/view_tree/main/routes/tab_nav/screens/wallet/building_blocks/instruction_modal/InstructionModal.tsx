import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import ExplainDigicoin from "./sub_screens/explain_digicoin/ExplainDigicoin";
import ExplainTierWage from "./sub_screens/explain_tier_wage/ExplainTierWage";

interface Props {
    navigateToProfile: () => void;
}

const InstructionModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.ExplainDigicoin:
            currentScreen = (
                <ExplainDigicoin navigateToProfile={props.navigateToProfile} />
            );
            break;
        case TutorialScreen.ExplainTierWage:
            currentScreen = <ExplainTierWage />;
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
