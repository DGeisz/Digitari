import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

interface Props {
    goBack: () => void;
}

const NewPostContent: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    When you create a post, first you input the post's main
                    content, and then you can optionally include an add-on
                    (text, image, or link). {"\n\n"}
                    For this post's content, introduce yourself and write out
                    your favorite place on earth. We'll leave "Add-on" as "None"
                    for now.{"\n\n"}
                    (This post is just for the tutorial and won't actually go
                    online)
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.NewPostPrompt}
                    goBack={props.goBack}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default NewPostContent;
