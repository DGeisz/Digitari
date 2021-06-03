import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../../../../../../global_styles/Palette";

interface Props {
    openNewPost: () => void;
}

const OpenFeedPrompt: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Way to go! You just created a post!{"\n\n"}
                    While we wait for people to react to your post, let's see if
                    you've received any new posts in your main feed.{"\n\n"}
                    Hit "Next," and then tap the home icon at the bottom left
                    side of your screen.
                </Text>
                <View style={instructionStyles.centralContentContainer}>
                    <Entypo name="home" size={30} color={palette.white} />
                </View>
                <TutorialFooter
                    goBackScreen={TutorialScreen.NewPostContent}
                    goBack={props.openNewPost}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default OpenFeedPrompt;
