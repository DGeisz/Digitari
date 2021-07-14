import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { instructionStyles } from "../../global_styles/InstructionStyles";

interface Props {
    top: boolean;
    onPress: () => void;
    footerText?: string;
}

const TutorialModal: React.FC<Props> = (props) => {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View
            style={
                props.top
                    ? instructionStyles.modalTop
                    : instructionStyles.modalBottom
            }
        >
            <View
                style={[
                    instructionStyles.instructionContainer,
                    { marginTop: top, marginBottom: bottom },
                ]}
            >
                <View style={instructionStyles.innerContainer}>
                    {props.children}
                    <View style={instructionStyles.footerContainer}>
                        <TouchableOpacity
                            style={instructionStyles.button}
                            onPress={props.onPress}
                        >
                            <Text style={instructionStyles.buttonText}>
                                {props.footerText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

TutorialModal.defaultProps = {
    footerText: "Ok!",
};

export default TutorialModal;
