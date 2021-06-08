import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../tutorial/context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../global_styles/InstructionStyles";
import IntroduceConvo from "./sub_screens/introduce_convo/IntroduceConvo";
import ExplainConvo from "./sub_screens/explain_convo/ExplainConvo";
import PromptReply from "./sub_screens/prompt_reply/PromptReply";
import PromptFinish from "./sub_screens/prompt_finish/PromptFinish";
import ExplainSuccess from "./sub_screens/explain_success/ExplainSuccess";
import ExplainFinish from "./sub_screens/explain_finish/ExplainFinish";

interface Props {
    goBack: () => void;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    const [visible, setVisible] = useState<boolean>(false);

    switch (tutorialScreen) {
        case TutorialScreen.IntroduceConvo:
            currentScreen = <IntroduceConvo goBack={props.goBack} />;
            break;
        case TutorialScreen.ExplainConvo:
            currentScreen = <ExplainConvo />;
            break;
        case TutorialScreen.PromptReply:
            currentScreen = <PromptReply />;
            break;
        case TutorialScreen.ExplainFinish:
            currentScreen = <ExplainFinish />;
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
