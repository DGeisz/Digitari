import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

interface Props {
    resetCollectTrans: () => void;
}

const CloserLookAtTransactions: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Alright, now that you've collected your earnings, let's take
                    a closer look at your transactions.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainTransactions}
                    goBack={props.resetCollectTrans}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default CloserLookAtTransactions;
