import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../../../../../global_styles/Palette";

interface Props {
    resetCollect: () => void;
}

const NewPostPrompt: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Awesome! Now let's use that digicoin to create a post!
                    {"\n\n"}
                    Hit "Next" and then tap the blue post button on the bottom
                    right side of your screen.
                </Text>
                <View style={instructionStyles.centralContentContainer}>
                    <FontAwesome
                        name="pencil"
                        size={35}
                        color={palette.white}
                    />
                </View>
                <TutorialFooter
                    goBackScreen={TutorialScreen.CollectTierWage}
                    goBack={props.resetCollect}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default NewPostPrompt;
