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
    earningCoinContent,
    explainCustomLikeContent,
    explainDigicoinLikeContent,
    explainDigitariContent,
    explainFeedRewardContent,
    explainResponseContent,
    hypeDigicoinContent,
    introduceDigicoinContent,
    likeFirstPostContent,
    promptOpenWalletContent,
    respondToPostContent,
    welcomeContent,
} from "../../../../../../../tutorial/screens/tutorial_screens/TutorialScreens";

interface Props {
    navigate2Wallet: () => void;
    navToFirstConvo: () => void;
    nav2NewPost: () => void;
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
        /*
         * First screens
         */
        case TutorialScreen.Welcome:
            currentScreen = (
                <TutorialModal
                    top
                    showGoBack={false}
                    goBackScreen={TutorialScreen.Welcome}
                    content={welcomeContent}
                />
            );
            break;
        case TutorialScreen.ExplainDigitari:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.Welcome}
                    content={explainDigitariContent}
                />
            );
            break;
        case TutorialScreen.HypeDigicoin:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ExplainDigitari}
                    content={hypeDigicoinContent}
                />
            );
            break;
        case TutorialScreen.IntroduceDigicoin:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.HypeDigicoin}
                    content={introduceDigicoinContent}
                />
            );
            break;

        /*
         * Return to feed screens
         */
        case TutorialScreen.EarningCoin:
            currentScreen = (
                <TutorialModal
                    top
                    goBack={props.nav2NewPost}
                    goBackScreen={TutorialScreen.ExplainRecipients}
                    content={earningCoinContent}
                />
            );
            break;
        case TutorialScreen.ExplainFeedReward:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.EarningCoin}
                    content={explainFeedRewardContent}
                />
            );
            break;
        case TutorialScreen.PromptOpenWallet:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ExplainFeedReward}
                    content={promptOpenWalletContent}
                />
            );
            break;

        case TutorialScreen.LikeFirstPost:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBack={props.navigate2Wallet}
                    goBackScreen={TutorialScreen.BackToFeed}
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
        // case TutorialScreen.IntroduceFeed:
        //     currentScreen = (
        //         <TutorialModal
        //             top={false}
        //             goBack={props.navigate2Wallet}
        //             goBackScreen={TutorialScreen.OpenFeedPrompt}
        //             content={introduceFeedContent}
        //         />
        //     );
        //     break;
        // case TutorialScreen.PromptReturnToWallet:
        //     currentScreen = (
        //         <TutorialModal
        //             top
        //             goBack={props.navToFirstConvo}
        //             goBackScreen={TutorialScreen.PromptReply}
        //             content={promptReturnToWalletContent}
        //         />
        //     );
        //     break;
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
