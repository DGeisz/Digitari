import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const PostFinished: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Alright, we're finally ready to post this content! (Again,
                    this is just for the tutorial, and nothing will go online).
                    {"\n\n"}
                    Hit "Next", and then tap the "Post" button at the bottom of
                    the screen!
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.NewPostRecipients}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default PostFinished;
