import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const ExplainTierWage: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Your account also naturally generates a certain amount of
                    digicoin called your "Tier Wage."{"\n\n"}Higher tiers like
                    😎 or 😍 make a higher Tier Wage than lower tiers like 🙁 or
                    👿, so always try to get to higher tiers!
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainDigicoin}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainTierWage;
