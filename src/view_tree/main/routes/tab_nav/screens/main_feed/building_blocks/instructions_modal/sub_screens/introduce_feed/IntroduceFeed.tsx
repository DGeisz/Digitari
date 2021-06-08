import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

interface Props {
    navigate2Wallet: () => void;
}

const IntroduceFeed: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Here's your feed on Digitari!{"\n\n"}
                    This is where you'll receive posts from people or
                    Communities you follow.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.OpenFeedPrompt}
                    goBack={props.navigate2Wallet}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default IntroduceFeed;
