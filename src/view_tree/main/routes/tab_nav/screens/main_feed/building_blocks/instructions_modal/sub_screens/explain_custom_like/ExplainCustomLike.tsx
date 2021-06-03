import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const ExplainCustomLike: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    If you want, you can also send a post a custom amount of
                    digicoin with a like!{"\n\n"}
                    To send a custom like, simply tap and hold on the coin icon.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainDigicoinLike}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainCustomLike;
