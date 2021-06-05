import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../context/tutorial_context/TutorialContext";

const ExplainSuccess: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Congratulations! You finished your first Convo!
                    {"\n\n"}
                    Once a Convo is finished, you can't send any more messages,
                    so make sure the Convo has reached a good stopping point
                    before you Finish it!
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.PromptFinish}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainSuccess;
