import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

interface Props {
    openNewPost: () => void;
}

const OpenFeedPrompt: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>Alleyoup!</Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.NewPostContent}
                    goBack={props.openNewPost}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default OpenFeedPrompt;
