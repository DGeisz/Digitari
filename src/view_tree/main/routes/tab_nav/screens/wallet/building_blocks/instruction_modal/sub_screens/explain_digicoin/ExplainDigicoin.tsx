import React from "react";
import { Text, View } from "react-native";
import { instructionStyles } from "../../../../../../../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../../../../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../../../../../../../../tutorial/context/tutorial_context/TutorialContext";

interface Props {
    navigateToProfile: () => void;
}

const ExplainDigicoin: React.FC<Props> = (props) => {
    return (
        <View style={instructionStyles.modalBottom}>
            <View style={instructionStyles.instructionContainer}>
                <Text style={instructionStyles.instructionText}>
                    This is your wallet where you'll collect the digicoin you've
                    earned!{"\n\n"}Digicoin is Digitari's in-game currency, and
                    you'll use it to create, like, and respond to posts.
                    {"\n\n"}
                    You earn digicoin when other people like and respond to your
                    posts.
                </Text>
                <TutorialFooter
                    goBackScreen={TutorialScreen.OpenWalletPrompt}
                    goBack={props.navigateToProfile}
                    showSkip
                    showGoBack
                />
            </View>
        </View>
    );
};

export default ExplainDigicoin;
