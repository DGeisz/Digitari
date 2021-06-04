import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";
import { palette } from "../../../../../../../../../../global_styles/Palette";
import { Entypo } from "@expo/vector-icons";

const RespondToPost: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    How 'bout we say hi to Zariah?{"\n\n"}
                    To respond to Zariah's post, tap the light blue button on
                    the bottom right side of her post and hit "Ok" in the pop-up
                    that appears.
                </Text>
                <View style={instructionStyles.centralContentContainer}>
                    <Entypo name="pencil" size={30} color={palette.white} />
                </View>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainResponse}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default RespondToPost;
