import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const CollectTierWage: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Alright, let's collect your earnings so you can create some
                    content!{"\n\n"}
                    Hit "Next," then tap on the "Collect" button.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainTierWage}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default CollectTierWage;
