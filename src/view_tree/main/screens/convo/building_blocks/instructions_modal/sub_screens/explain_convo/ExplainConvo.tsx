import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const ExplainConvo: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Internet comments sections can be very disorganized and
                    toxic, so Digitari replaces comments with Convos!
                    {"\n\n"}
                    Like a comments section, all Convos associated with a post
                    are visible to anyone on the platform and can be viewed by
                    opening a post.
                    {"\n\n"}
                    However, Convos only become visible if the post creator
                    responds to the Convo.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.IntroduceConvo}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainConvo;
