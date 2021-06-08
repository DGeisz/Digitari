import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import NewPostContent from "./sub_screens/new_post_content/NewPostContent";
import NewPostTarget from "./sub_screens/new_post_target/NewPostTarget";
import NewPostRecipients from "./sub_screens/new_post_recipients/NewPostRecipients";
import PostFinished from "./sub_screens/post_finished/PostFinished";

interface Props {
    goBack: () => void;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.NewPostContent:
            currentScreen = <NewPostContent goBack={props.goBack} />;
            break;
        case TutorialScreen.NewPostTarget:
            currentScreen = <NewPostTarget />;
            break;
        case TutorialScreen.NewPostRecipients:
            currentScreen = <NewPostRecipients />;
            break;
        case TutorialScreen.PostFinished:
            currentScreen = <PostFinished />;
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
