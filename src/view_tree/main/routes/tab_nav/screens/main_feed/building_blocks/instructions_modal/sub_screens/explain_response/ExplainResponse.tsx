import React, { useContext } from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const ExplainResponse: React.FC = () => {
    const { customLikeTutorialPost } = useContext(TutorialContext);

    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Bennet's making a lot of dough!{"\n\n"}
                    If you want to, you can also respond to a post and chat with
                    the post creator! {"\n\n"}
                    Sending a response to a post costs digicoin, but if your
                    convo goes well, you get a digicoin reward and you can
                    improve your tier!
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.CustomLikePost}
                    goBack={() => customLikeTutorialPost(false)}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainResponse;
