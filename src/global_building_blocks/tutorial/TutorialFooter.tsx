import React, { useContext, useState } from "react";
import { Text, LayoutAnimation, TouchableOpacity, View } from "react-native";
import { instructionStyles } from "../../global_styles/InstructionStyles";
import {
    TutorialContext,
    TutorialScreen,
} from "../../view_tree/context/tutorial_context/TutorialContext";

interface Props {
    goBackScreen: TutorialScreen;
    showGoBack?: boolean;
    showSkip?: boolean;
    goBack?: () => void;
}

const TutorialFooter: React.FC<Props> = (props) => {
    const { setScreen, skipTutorial, advanceTutorial } = useContext(
        TutorialContext
    );

    const [showSkipDialog, setSkipVisible] = useState<boolean>(false);

    if (showSkipDialog) {
        return (
            <View style={instructionStyles.skipContainer}>
                <Text style={instructionStyles.skipText}>
                    Are you sure you want to skip the tutorial? {"\n\n"}If you
                    want to revisit the tutorial, you can open it by going to
                    the settings page.
                </Text>
                <View style={instructionStyles.skipFooter}>
                    <TouchableOpacity
                        style={instructionStyles.cancelButton}
                        onPress={() => {
                            LayoutAnimation.easeInEaseOut();
                            setSkipVisible(false);
                        }}
                    >
                        <Text style={instructionStyles.cancelButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={instructionStyles.skipButton}
                        onPress={skipTutorial}
                    >
                        <Text style={instructionStyles.skipButtonText}>
                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={instructionStyles.footerContainer}>
            <View style={instructionStyles.footerLeft}>
                {!!props.showGoBack && (
                    <TouchableOpacity
                        onPress={() => {
                            setScreen(props.goBackScreen);
                            !!props.goBack && props.goBack();
                        }}
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
                    <TouchableOpacity
                        onPress={() => {
                            LayoutAnimation.easeInEaseOut();
                            setSkipVisible(true);
                        }}
                    >
                        <Text style={instructionStyles.footerText}>Skip</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default TutorialFooter;
