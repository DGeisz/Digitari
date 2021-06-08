import React, { useContext } from "react";
import { View } from "react-native";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import ExplainDigicoin from "./sub_screens/explain_digicoin/ExplainDigicoin";
import ExplainTierWage from "./sub_screens/explain_tier_wage/ExplainTierWage";
import CollectTierWage from "./sub_screens/collect_tier_wage/CollectTierWage";
import NewPostPrompt from "./sub_screens/new_post_prompt/NewPostPrompt";
import OpenFeedPrompt from "./sub_screens/open_feed_prompt/OpenFeedPrompt";
import ExplainTransactions from "./sub_screens/explain_transactions/ExplainTransactions";
import PromptCollectTransactions from "./sub_screens/prompt_collect_transactions/PromptCollectTransactions";
import CloserLookAtTransactions from "./sub_screens/closer_look_at_transactions/CloserLookAtTransactions";
import ConvoFinishedTransactions from "./sub_screens/convo_finished_transactions/ConvoFinishedTransactions";
import LikeTransactions from "./sub_screens/like_transactions/LikeTransactions";
import PromptOpenConvos from "./sub_screens/prompt_open_convos/PromptOpenConvos";
import NewResponseTransactions from "./sub_screens/new_response_transactions/NewResponseTransactions";

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
        case TutorialScreen.ExplainTransactions:
            currentScreen = (
                <ExplainTransactions nav2MainFeed={props.nav2MainFeed} />
            );
            break;
        case TutorialScreen.CloserLookAtTransactions:
            currentScreen = (
                <CloserLookAtTransactions
                    resetCollectTrans={props.resetCollectTrans}
                />
            );
            break;
        case TutorialScreen.ConvoFinishedTransactions:
            currentScreen = <ConvoFinishedTransactions />;
            break;
        case TutorialScreen.LikeTransactions:
            currentScreen = <LikeTransactions />;
            break;
        case TutorialScreen.NewResponseTransactions:
            currentScreen = <NewResponseTransactions />;
            break;
        case TutorialScreen.PromptOpenConvos:
            currentScreen = <PromptOpenConvos />;
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
