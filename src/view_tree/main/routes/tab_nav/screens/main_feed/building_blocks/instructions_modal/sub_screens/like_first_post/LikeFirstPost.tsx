import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import CoinBox from "../../../../../../../../../../global_building_blocks/coin_box/CoinBox";

const LikeFirstPost: React.FC = () => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Looks like Zariah just joined the platform and is
                    introducing herself! Let's like Zariah's post to welcome her
                    to the platform!{"\n\n"}
                    To like her post, tap the coin icon underneath her tier
                    emoji 🙂.
                </Text>
                <View style={instructionStyles.centralContentContainer}>
                    <CoinBox
                        showAmount={false}
                        active={false}
                        coinSize={35}
                        paddingVertical={0}
                    />
                </View>
                <TutorialFooter
                    goBackScreen={TutorialScreen.IntroduceFeed}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default LikeFirstPost;
