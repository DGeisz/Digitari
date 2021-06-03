import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";

const CustomLikePost: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    As you might have noticed, liking a post automatically sends
                    the post creator 10 of your digicoin.{"\n\n"}
                    Because you receive digicoin when people like your posts,
                    you can earn a ton digicoin if people enjoy your content!
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.IntroduceFeed}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default CustomLikePost;
