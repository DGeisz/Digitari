import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const PromptResponseMessage: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    In the message input at the bottom of the screen, say hi to
                    Zariah and ask her what she likes about Surfer's Paradise.
                    {"\n\n"}
                    After doing so, send the message!
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainIdentity}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default PromptResponseMessage;
