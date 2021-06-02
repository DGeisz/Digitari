import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { instructionStyles } from "../../global_styles/InstructionStyles";
import {
    TutorialContext,
    TutorialScreen,
} from "../../view_tree/context/tutorial_context/TutorialContext";

interface Props {
    goBackScreen: TutorialScreen;
    showGoBack?: boolean;
    showSkip?: boolean;
}

const TutorialFooter: React.FC<Props> = (props) => {
    const { setScreen, skipTutorial, advanceTutorial } = useContext(
        TutorialContext
    );

    return (
        <View style={instructionStyles.footerContainer}>
            <View style={instructionStyles.footerLeft}>
                {!!props.showGoBack && (
                    <TouchableOpacity
                        onPress={() => setScreen(props.goBackScreen)}
                    >
                        <Text style={instructionStyles.footerText}>
                            Go back
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity
                style={instructionStyles.button}
                onPress={advanceTutorial}
            >
                <Text style={instructionStyles.buttonText}>Next</Text>
            </TouchableOpacity>
            <View style={instructionStyles.footerRight}>
                {!!props.showSkip && (
                    <TouchableOpacity onPress={skipTutorial}>
                        <Text style={instructionStyles.footerText}>Skip</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default TutorialFooter;
