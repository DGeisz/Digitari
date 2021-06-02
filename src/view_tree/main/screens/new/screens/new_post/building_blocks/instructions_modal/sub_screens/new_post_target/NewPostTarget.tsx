import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const NewPostTarget: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    In Digitari, you get to decide who's going to receive your
                    post in their main feed by choosing "Target."{"\n\n"}
                    You can either send your post to your followers, or people
                    in a Community.{"\n\n"}
                    You don't have followers yet, so we selected the "New
                    members" Community as your post target.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.NewPostPrompt}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default NewPostTarget;
