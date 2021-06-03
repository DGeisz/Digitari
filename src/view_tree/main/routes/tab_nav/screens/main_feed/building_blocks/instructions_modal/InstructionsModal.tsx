import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../context/tutorial_context/TutorialContext";
import IntroduceFeed from "./sub_screens/introduce_feed/IntroduceFeed";
import LikeFirstPost from "./sub_screens/like_first_post/LikeFirstPost";
import CustomLikePost from "./sub_screens/custom_like_post/CustomLikePost";
import RespondToPost from "./sub_screens/respond_to_post/RespondToPost";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";

interface Props {
    navigate2Wallet: () => void;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.IntroduceFeed:
            currentScreen = (
                <IntroduceFeed navigate2Wallet={props.navigate2Wallet} />
            );
            break;
        case TutorialScreen.LikeFirstPost:
            currentScreen = <LikeFirstPost />;
            break;
        case TutorialScreen.CustomLikePost:
            currentScreen = <CustomLikePost />;
            break;
        case TutorialScreen.RespondToPost:
            currentScreen = <RespondToPost />;
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
