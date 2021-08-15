import React, { useState } from "react";
import { LayoutAnimation, Text } from "react-native";
import TutorialModal from "../../../../../../../../global_building_blocks/tutorial/TutorialModal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import Modal from "react-native-modal";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";
import { tier2Emoji } from "../../../../../../../../global_types/TierTypes";
import { openedFirstProfile } from "../../../../../../../../global_state/FirstImpressionsState";

enum Screens {
    Welcome,
    PokeInstruct,
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
                        props.hideModal();
                        openedFirstProfile();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        You start out at level 0. In order to become more
                        powerful and unlock more features, you need to level up!
                        {DOUBLE_NEWLINE}
                        Lucky for you, making it past the first few levels is
                        pretty easy 😉 {DOUBLE_NEWLINE}
                        Just hit "Level Up" at the top of the page to learn what
                        you have to do.
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
