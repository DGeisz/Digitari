import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

interface Props {
    nav2MainFeed: () => void;
}

const ExplainTransactions: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Wow, looks like you made a ton of digicoin off transactions!
                    {"\n\n"}
                    Transactions are like notifications that contain digicoin
                    for you to collect!{"\n\n"}
                    Tap the "Collect" button to collect your earnings.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.PromptReturnToWallet}
                    goBack={props.nav2MainFeed}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainTransactions;
