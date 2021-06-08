import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import CoinBox from "../../../../../../../../../../global_building_blocks/coin_box/CoinBox";

const CustomLikePost: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Bennet's doge meme is pretty cute! To show him our
                    appreciation, let's send him a custom like with 100
                    digicoin.{"\n\n"}
                    Tap and hold the coin underneath Bennet's tier emoji 😃,
                    enter "100" for "Amount" in the pop-up, and press "Like."
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.ExplainCustomLike}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default CustomLikePost;
