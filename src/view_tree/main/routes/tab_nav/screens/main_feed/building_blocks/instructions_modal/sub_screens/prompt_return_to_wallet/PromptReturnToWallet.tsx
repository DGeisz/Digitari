import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../context/tutorial_context/TutorialContext";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../../../../../../global_styles/Palette";

interface Props {
    navToFirstConvo: () => void;
}

const PromptReturnToWallet: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalTop}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    Woah, did you see that! It looks like you just received some
                    Digicoin! {"\n\n"}
                    Tap the wallet icon in the bottom bar collect your earnings!
                </Text>
                <View style={instructionStyles.centralContentContainer}>
                    <Entypo name="wallet" size={30} color={palette.white} />
                </View>
                <TutorialFooter
                    goBackScreen={TutorialScreen.PromptReply}
                    goBack={props.navToFirstConvo}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default PromptReturnToWallet;
