import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const ProfileDescription: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Here's your profile on Digitari! {"\n\n"}On this page, you
                    can set your profile pic and your bio, as well as review
                    your activity on Digitari.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.Welcome}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ProfileDescription;
