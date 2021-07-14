import React, { useState } from "react";
import { LayoutAnimation, Text } from "react-native";
import TutorialModal from "../../../../../../../../global_building_blocks/tutorial/TutorialModal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import Modal from "react-native-modal";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";
import { tier2Emoji } from "../../../../../../../../global_types/TierTypes";

enum Screens {
    Welcome,
    PokeInstruct,
    TapInstruct,
}

interface Props {
    hideModal: () => void;
    visible: boolean;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const [screen, setScreen] = useState<Screens>(Screens.Welcome);

    let modalContent;

    switch (screen) {
        case Screens.Welcome:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.PokeInstruct);
                    }}
                    footerText="Next"
                >
                    <Text style={instructionStyles.instructionText}>
                        Welcome to Digitari! 🎉{DOUBLE_NEWLINE}
                        Ready to experience this glorious fusion of social media
                        and video game? {DOUBLE_NEWLINE}
                        Of course you are, you beautiful stallion. Let's rock 'n
                        roll, baby 🤘
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.PokeInstruct:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.TapInstruct);
                    }}
                    footerText="Next"
                >
                    <Text style={instructionStyles.instructionText}>
                        Poke around to get a feel for the platform.{" "}
                        {DOUBLE_NEWLINE}
                        The Shop is a pretty good place to start to learn what
                        you can unlock in Digitari.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.TapInstruct:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        props.hideModal();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        One last thing.
                        {DOUBLE_NEWLINE}
                        There are a couple features in Digitari that don't exist
                        on other platforms.
                        {DOUBLE_NEWLINE}
                        If you don't recognize something (like the{" "}
                        {tier2Emoji(0)} next to your name), just tap on it to
                        learn what it is.
                        {DOUBLE_NEWLINE}
                        You'll catch on really quick 😉
                    </Text>
                </TutorialModal>
            );
    }

    return (
        <Modal isVisible={props.visible} style={instructionStyles.modal}>
            {modalContent}
        </Modal>
    );
};

export default InstructionsModal;
