import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const ConvoFinishedTransactions: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Your reward for your successful Convo with Zariah is at the
                    bottom of the list.{"\n\n"}
                    Again, you'll receive a reward for every successful Convo
                    you start with a post creator.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.CloserLookAtTransactions}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ConvoFinishedTransactions;
