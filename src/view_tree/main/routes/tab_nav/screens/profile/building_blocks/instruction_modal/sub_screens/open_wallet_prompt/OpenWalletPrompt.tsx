import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../../../../../../global_styles/Palette";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

const OpenWalletPrompt: React.FC = () => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Don't worry about tier info (like tier wage) for now, just
                    remember that the different emojis like 😎, 😍, and 😇
                    correspond to different tiers. {"\n\n"}Alright, let's
                    actually do some stuff! Hit "Next," and then tap the wallet
                    icon at the bottom of the screen.
                </Text>
                <View style={instructionStyles.centralContentContainer}>
                    <Entypo name="wallet" size={30} color={palette.white} />
                </View>
                <TutorialFooter
                    goBackScreen={TutorialScreen.OpenTierPrompt}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default OpenWalletPrompt;
