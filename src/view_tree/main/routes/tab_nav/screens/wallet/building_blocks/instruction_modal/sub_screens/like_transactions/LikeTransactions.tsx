import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const LikeTransactions: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    If you look above your Convo reward, you'll see that your
                    post has received some likes!{"\n\n"}
                    Whenever your posts get liked, you receive digicoin through
                    transactions.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ConvoFinishedTransactions}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default LikeTransactions;
