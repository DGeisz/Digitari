import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import TutorialModal from "../../../../../../../tutorial/building_blocks/tutorial_modal/TutorialModal";
import {
    explainRecipientsContent,
    explainTargetContent,
    introduceNewPostContent,
} from "../../../../../../../tutorial/screens/tutorial_screens/TutorialScreens";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";

interface Props {
    goBack: () => void;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.IntroduceNewPost:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBack={props.goBack}
                    goBackScreen={TutorialScreen.IntroduceDigicoin}
                    content={introduceNewPostContent}
                />
            );
            break;
        case TutorialScreen.ExplainTarget:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.IntroduceNewPost}
                    content={explainTargetContent}
                />
            );
            break;
        case TutorialScreen.ExplainRecipients:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ExplainTarget}
                    content={explainRecipientsContent}
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
