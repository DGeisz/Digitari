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
import CollectTierWage from "./sub_screens/collect_tier_wage/CollectTierWage";
import NewPostPrompt from "./sub_screens/new_post_prompt/NewPostPrompt";
import OpenFeedPrompt from "./sub_screens/open_feed_prompt/OpenFeedPrompt";

interface Props {
    navigateToProfile: () => void;
    openNewPost: () => void;
    resetCollect: () => void;
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
        case TutorialScreen.CollectTierWage:
            currentScreen = <CollectTierWage />;
            break;
        case TutorialScreen.NewPostPrompt:
            currentScreen = <NewPostPrompt resetCollect={props.resetCollect} />;
            break;
        case TutorialScreen.OpenFeedPrompt:
            currentScreen = <OpenFeedPrompt openNewPost={props.openNewPost} />;
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
