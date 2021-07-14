import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { instructionStyles } from "../../global_styles/InstructionStyles";
import TutorialFooter from "./TutorialFooter";

interface Props {
    goBack?: () => void;
    showGoBack?: boolean;
    top: boolean;
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
                    <TutorialFooter
                        goBack={props.goBack}
                        showGoBack={props.showGoBack}
                    />
                </View>
            </View>
        </View>
    );
};

TutorialModal.defaultProps = {
    showGoBack: true,
};

export default TutorialModal;
