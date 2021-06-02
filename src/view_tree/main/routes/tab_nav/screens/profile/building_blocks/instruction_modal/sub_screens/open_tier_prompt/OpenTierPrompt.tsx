import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const OpenTierPrompt: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    You might have noticed the 🙂 by your name. This is your
                    tier! {"\n\n"}There are 10 different tiers, and you can
                    increase your tier by having good interactions with other
                    people.{"\n\n"}We'll talk more about tiers in a bit, but for
                    for now hit "Next" and then tap on the 🙂 to see all the
                    tiers.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ProfileDescription}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default OpenTierPrompt;
