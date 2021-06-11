import React, { useContext } from "react";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import { View } from "react-native";
import TutorialModal from "../../../../../../../tutorial/building_blocks/tutorial_modal/TutorialModal";
import {
    almostFinishedContent,
    explainChallengesContent,
    explainInvitesContent,
    explainRankingTierContent,
    lastRemarksContent,
    openTierPromptContent,
    profileDescriptionContent,
    rankingTier2Content,
} from "../../../../../../../tutorial/screens/tutorial_screens/TutorialScreens";

interface Props {
    navToFirstConvo: () => void;
}

const InstructionModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen } = useContext(TutorialContext);

    let modalVisible = tutorialActive;
    let currentScreen = <View />;

    switch (tutorialScreen) {
        // case TutorialScreen.Welcome:
        //     currentScreen = (
        //         <TutorialModal
        //             goBackScreen={TutorialScreen.Welcome}
        //             content={welcomeContent}
        //             top
        //             showGoBack={false}
        //         />
        //     );
        //     break;
        case TutorialScreen.ProfileDescription:
            currentScreen = (
                <TutorialModal
                    goBack={props.navToFirstConvo}
                    goBackScreen={TutorialScreen.Welcome}
                    content={profileDescriptionContent}
                    top={false}
                />
            );
            break;
        case TutorialScreen.OpenTierPrompt:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ProfileDescription}
                    content={openTierPromptContent}
                />
            );
            break;
        case TutorialScreen.RankingTier2:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.OpenTierPrompt}
                    content={rankingTier2Content}
                />
            );
            break;
        case TutorialScreen.ExplainRankingTier:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.OpenTierPrompt}
                    content={explainRankingTierContent}
                />
            );
            break;
        case TutorialScreen.AlmostFinished:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ExplainRankingTier}
                    content={almostFinishedContent}
                />
            );
            break;
        case TutorialScreen.ExplainChallenges:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.AlmostFinished}
                    content={explainChallengesContent}
                />
            );
            break;
        case TutorialScreen.ExplainInvites:
            currentScreen = (
                <TutorialModal
                    top={false}
                    goBackScreen={TutorialScreen.ExplainChallenges}
                    content={explainInvitesContent}
                />
            );
            break;
        case TutorialScreen.LastRemarks:
            currentScreen = (
                <TutorialModal
                    top
                    goBackScreen={TutorialScreen.ExplainInvites}
                    content={lastRemarksContent}
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
