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
    closerLookAtTransactionsContent,
    collectTierWageContent,
    convoFinishedTransactionsContent,
    explainDigicoinContent,
    explainTierWageContent,
    explainTransactionsContent,
    likeTransactionsContent,
    newPostPromptContent,
    newResponseTransactionsContent,
    openFeedPromptContent,
    promptOpenConvosContent,
} from "../../../../../../../tutorial/screens/tutorial_screens/TutorialScreens";

interface Props {
    navigateToProfile: () => void;
    openNewPost: () => void;
    resetCollect: () => void;
    nav2MainFeed: () => void;
    resetCollectTrans: () => void;
}

const InstructionModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        case TutorialScreen.ExplainDigicoin:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.OpenWalletPrompt}
                    content={explainDigicoinContent}
                    goBack={props.navigateToProfile}
                />
            );
            break;
        case TutorialScreen.ExplainTierWage:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ExplainDigicoin}
                    content={explainTierWageContent}
                />
            );
            break;
        case TutorialScreen.CollectTierWage:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ExplainTierWage}
                    content={collectTierWageContent}
                />
            );
            break;
        case TutorialScreen.NewPostPrompt:
            currentScreen = (
                <TutorialModal
                    top
                    goBack={props.resetCollect}
                    goBackScreen={TutorialScreen.CollectTierWage}
                    content={newPostPromptContent}
                />
            );
            break;
        case TutorialScreen.OpenFeedPrompt:
            currentScreen = (
                <TutorialModal
                    top
                    goBack={props.openNewPost}
                    goBackScreen={TutorialScreen.NewPostContent}
                    content={openFeedPromptContent}
                />
            );
            break;
        case TutorialScreen.ExplainTransactions:
            currentScreen = (
                <TutorialModal
                    top
                    goBack={props.nav2MainFeed}
                    goBackScreen={TutorialScreen.PromptReturnToWallet}
                    content={explainTransactionsContent}
                />
            );
            break;
        case TutorialScreen.CloserLookAtTransactions:
            currentScreen = (
                <TutorialModal
                    top
                    goBack={props.resetCollectTrans}
                    goBackScreen={TutorialScreen.ExplainTransactions}
                    content={closerLookAtTransactionsContent}
                />
            );
            break;
        case TutorialScreen.ConvoFinishedTransactions:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.CloserLookAtTransactions}
                    content={convoFinishedTransactionsContent}
                />
            );
            break;
        case TutorialScreen.LikeTransactions:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ConvoFinishedTransactions}
                    content={likeTransactionsContent}
                />
            );
            break;
        case TutorialScreen.NewResponseTransactions:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.LikeTransactions}
                    content={newResponseTransactionsContent}
                />
            );
            break;
        case TutorialScreen.PromptOpenConvos:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.NewResponseTransactions}
                    content={promptOpenConvosContent}
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

export default InstructionModal;
