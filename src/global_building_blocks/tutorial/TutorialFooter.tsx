import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { instructionStyles } from "../../global_styles/InstructionStyles";

interface Props {
    showGoBack?: boolean;
    goBack?: () => void;
}

const TutorialFooter: React.FC<Props> = () => {
    return (
        <View style={instructionStyles.footerContainer}>
            <View style={instructionStyles.footerLeft} />
            <TouchableOpacity style={instructionStyles.button}>
                <Text style={instructionStyles.buttonText}>Next</Text>
            </TouchableOpacity>
            <View style={instructionStyles.footerRight} />
        </View>
    );
};

export default TutorialFooter;
