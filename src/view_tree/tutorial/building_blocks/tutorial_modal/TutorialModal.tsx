import React, { ReactNode } from "react";
import { View } from "react-native";
import { instructionStyles } from "../../../../global_styles/InstructionStyles";
import TutorialFooter from "../../../../global_building_blocks/tutorial/TutorialFooter";
import { TutorialScreen } from "../../context/tutorial_context/TutorialContext";

interface Props {
    content: ReactNode;
    goBackScreen: TutorialScreen;
    goBack?: () => void;
    showGoBack?: boolean;
    top: boolean;
}

const TutorialModal: React.FC<Props> = (props) => {
    return (
        <View
            style={
                props.top
                    ? instructionStyles.modalTop
                    : instructionStyles.modalBottom
            }
        >
            <View style={instructionStyles.instructionContainer}>
                {props.content}
                <TutorialFooter
                    goBackScreen={props.goBackScreen}
                    goBack={props.goBack}
                    showGoBack={props.showGoBack}
                />
            </View>
        </View>
    );
};

TutorialModal.defaultProps = {
    showGoBack: true,
};

export default TutorialModal;
