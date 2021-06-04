import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../context/tutorial_context/TutorialContext";

interface Props {
    goBack: () => void;
}

const ExplainIdentity: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    When you respond to a post, you can respond anonymously or
                    as yourself. {"\n\n"}
                    For right now, let's respond non-anonymously so Zariah knows
                    who she's talking to.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.RespondToPost}
                    goBack={props.goBack}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainIdentity;
