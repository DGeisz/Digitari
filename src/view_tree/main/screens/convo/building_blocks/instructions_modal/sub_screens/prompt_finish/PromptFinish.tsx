import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../context/tutorial_context/TutorialContext";

const PromptFinish: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    It seems like a good time to finish your Convo with Zariah!
                    {"\n\n"}
                    To finish this convo, tap the "Finish Convo" button at the
                    end of the Convo, and then press "Finish" in the pop-up that
                    appears.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainFinish}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default PromptFinish;
