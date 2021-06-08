import React, { useContext } from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const PromptReply: React.FC = () => {
    const { setTutConvoMessages } = useContext(TutorialContext);

    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Looks like Zariah just responded! {"\n\n"}
                    Answer her question and tell her whether you like beaches.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainConvo}
                    goBack={() => {
                        setTimeout(() => {
                            setTutConvoMessages((messages) => [messages[0]]);
                        }, 700);
                    }}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default PromptReply;
