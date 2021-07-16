import React, { useState } from "react";
import Modal from "react-native-modal";
import TutorialModal from "../../../../../../../../global_building_blocks/tutorial/TutorialModal";
import { LayoutAnimation, Text } from "react-native";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";
import { openedFirstWallet } from "../../../../../../../../global_state/FirstImpressionsState";

enum Screens {
    Intro,
    InfiniteWallet,
    CollectPrompt,
}

interface Props {
    hideModal: () => void;
    visible: boolean;
}

const InstructionsModal: React.FC<Props> = (props) => {
    const [screen, setScreen] = useState<Screens>(Screens.Intro);

    let modalContent;
    switch (screen) {
        case Screens.Intro:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.InfiniteWallet);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        This is your Wallet, where all your dreams come true 🤩
                        {DOUBLE_NEWLINE}
                        Whenever you earn digicoin, it's stored here in
                        transactions.
                        {DOUBLE_NEWLINE}
                        Then when you're ready, slap that "Collect" button to
                        transfer your earnings to your account!
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.InfiniteWallet:
            modalContent = (
                <TutorialModal
                    top={false}
                    footerText={"Next"}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.CollectPrompt);
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        As a welcoming gift, you get 48 hours of an infinitely
                        large wallet! 🎉 {DOUBLE_NEWLINE}
                        After that, your wallet's max capacity goes down to 100
                        coin, but you can upgrade it in the Shop.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.CollectPrompt:
            modalContent = (
                <TutorialModal
                    top={false}
                    footerText={"Next"}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        props.hideModal();
                        openedFirstWallet();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        Looks like you earned 1,000 coin for joining Digitari!
                        That's nice of us 😉{DOUBLE_NEWLINE}
                        Hit "Collect" to collect your earnings.
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
