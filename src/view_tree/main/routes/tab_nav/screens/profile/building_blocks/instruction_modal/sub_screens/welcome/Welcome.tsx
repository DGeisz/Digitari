import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const Welcome: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Welcome to Digitari!{"\n\n"}Ready to gain a massive
                    following, connect with fascinating people, or just find
                    some top-notch content? Let's get started!
                </Text>
                <TutorialFooter
                    showSkip
                    goBackScreen={TutorialScreen.Welcome}
                />
            </View>
        </View>
    );
};

export default Welcome;
