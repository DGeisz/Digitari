import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";

interface Props {
    goBack: () => void;
}

const IntroduceConvo: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    This is a Digitari convo! {"\n\n"}
                    Convos allow you to respond to posts and connect with post
                    creators!{"\n\n"}
                    You can think of a Digitari convo as a mini text
                    conversation between you and the post creator about their
                    post.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.PromptResponseMessage}
                    goBack={props.goBack}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default IntroduceConvo;
