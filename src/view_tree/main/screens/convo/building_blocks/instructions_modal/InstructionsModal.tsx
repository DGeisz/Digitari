import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../tutorial/context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../global_styles/InstructionStyles";
import TutorialModal from "../../../../../tutorial/building_blocks/tutorial_modal/TutorialModal";
import {
    explainConvoContent,
    explainFinishContent,
    explainSuccessContent,
    introduceConvoContent,
    promptFinishContent,
    promptReplyContent,
} from "../../../../../tutorial/screens/tutorial_screens/TutorialScreens";

interface Props {
    goBack: () => void;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen, setTutConvoMessages } = useContext(
        TutorialContext
    );

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    const [visible, setVisible] = useState<boolean>(false);

    switch (tutorialScreen) {
        case TutorialScreen.IntroduceConvo:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBack={props.goBack}
                    goBackScreen={TutorialScreen.PromptResponseMessage}
                    content={introduceConvoContent}
                />
            );
            break;
        case TutorialScreen.ExplainConvo:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.IntroduceConvo}
                    content={explainConvoContent}
                />
            );
            break;
        case TutorialScreen.PromptReply:
            currentScreen = (
                <TutorialModal
                    top
                    goBack={() => {
                        setTimeout(() => {
                            setTutConvoMessages((messages) => [messages[0]]);
                        }, 700);
                    }}
                    goBackScreen={TutorialScreen.ExplainConvo}
                    content={promptReplyContent}
                />
            );
            break;
        case TutorialScreen.ExplainFinish:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.PromptReply}
                    goBack={() => {
                        setTimeout(() => {
                            setTutConvoMessages((messages) =>
                                messages.slice(0, 2)
                            );
                        }, 700);
                    }}
                    content={explainFinishContent}
                />
            );
            break;
        case TutorialScreen.PromptFinish:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ExplainFinish}
                    content={promptFinishContent}
                />
            );
            break;
        case TutorialScreen.ExplainSuccess:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.PromptFinish}
                    content={explainSuccessContent}
                />
            );
            break;
        default:
            modalVisible = false;
    }

    useEffect(() => {
        if (modalVisible && !visible) {
            setTimeout(() => {
                setVisible(true);
            }, 700);
        } else if (!modalVisible) {
            setVisible(false);
        }
    }, [modalVisible, visible]);

    return (
        <Modal
            isVisible={visible}
            style={instructionStyles.modal}
            backdropOpacity={0.5}
        >
            {currentScreen}
        </Modal>
    );
};

export default InstructionsModal;
