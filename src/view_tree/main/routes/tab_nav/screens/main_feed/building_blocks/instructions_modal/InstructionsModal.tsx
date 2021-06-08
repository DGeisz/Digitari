import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialModal from "../../../../../../../tutorial/building_blocks/tutorial_modal/TutorialModal";
import {
    customLikePostContent,
    explainCustomLikeContent,
    explainDigicoinLikeContent,
    explainResponseContent,
    introduceFeedContent,
    likeFirstPostContent,
    promptReturnToWalletContent,
    respondToPostContent,
} from "../../../../../../../tutorial/screens/tutorial_screens/TutorialScreens";

interface Props {
    navigate2Wallet: () => void;
    navToFirstConvo: () => void;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const {
        tutorialActive,
        tutorialScreen,
        customLikeTutorialPost,
    } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.IntroduceFeed:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBack={props.navigate2Wallet}
                    goBackScreen={TutorialScreen.OpenFeedPrompt}
                    content={introduceFeedContent}
                />
            );
            break;
        case TutorialScreen.LikeFirstPost:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.IntroduceFeed}
                    content={likeFirstPostContent}
                />
            );
            break;
        case TutorialScreen.ExplainDigicoinLike:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.LikeFirstPost}
                    content={explainDigicoinLikeContent}
                />
            );
            break;
        case TutorialScreen.ExplainCustomLike:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ExplainDigicoinLike}
                    content={explainCustomLikeContent}
                />
            );
            break;
        case TutorialScreen.ExplainResponse:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.CustomLikePost}
                    goBack={() => customLikeTutorialPost(false)}
                    content={explainResponseContent}
                />
            );
            break;
        case TutorialScreen.CustomLikePost:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ExplainCustomLike}
                    content={customLikePostContent}
                />
            );
            break;
        case TutorialScreen.RespondToPost:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ExplainResponse}
                    content={respondToPostContent}
                />
            );
            break;
        case TutorialScreen.PromptReturnToWallet:
            currentScreen = (
                <TutorialModal
                    top
                    goBack={props.navToFirstConvo}
                    goBackScreen={TutorialScreen.PromptReply}
                    content={promptReturnToWalletContent}
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
