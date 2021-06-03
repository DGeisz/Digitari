import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const NewPostRecipients: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Finally, you get to choose how many people are going to
                    receive your post by entering "Recipients." Pretty neat,
                    huh?
                    {"\n\n"}
                    Posting costs 10 digicoin per recipient, so if you want more
                    people to receive your content, you need to earn more
                    digicoin!
                    {"\n\n"}
                    Hit next, and enter "20" into the "Recipients" field.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.NewPostTarget}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default NewPostRecipients;
