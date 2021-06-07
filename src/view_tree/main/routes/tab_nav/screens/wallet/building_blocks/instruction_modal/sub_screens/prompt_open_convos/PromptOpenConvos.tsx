import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../../../../../../../../../global_styles/Palette";

const PromptOpenConvos: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Let's actually look at these new responses. {"\n\n"}
                    Tap the Convo icon in the tab bar at the bottom of the
                    screen.
                </Text>
                <View style={instructionStyles.centralContentContainer}>
                    <Ionicons
                        name={"ios-chatbubbles"}
                        size={30}
                        color={palette.white}
                    />
                </View>
                <TutorialFooter
                    goBackScreen={TutorialScreen.NewResponseTransactions}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default PromptOpenConvos;
