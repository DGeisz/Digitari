import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const NewResponseTransactions: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Finally, at the top of the list of transactions, it looks
                    like your post has received some responses! {"\n\n"}
                    In other words, people are trying to start Convos with you
                    about your post!
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.LikeTransactions}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default NewResponseTransactions;
