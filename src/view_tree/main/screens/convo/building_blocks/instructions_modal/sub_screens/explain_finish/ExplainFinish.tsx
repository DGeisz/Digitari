import React, { useContext } from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../context/tutorial_context/TutorialContext";

const ExplainFinish: React.FC = () => {
    const { setTutConvoMessages } = useContext(TutorialContext);
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    After the post creator has sent two messages in a Convo, you
                    have the opportunity to finish the Convo.{"\n\n"}
                    When you finish a Convo, you earn the Convo reward, and your
                    ranking increases by 1 point! {"\n\n"}
                    Your ranking qualifies you for different tiers, so in order
                    to reach higher tiers, you must successfully finish Convos.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.PromptReply}
                    goBack={() => {
                        setTimeout(() => {
                            setTutConvoMessages((messages) =>
                                messages.slice(0, 2)
                            );
                        }, 700);
                    }}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainFinish;
