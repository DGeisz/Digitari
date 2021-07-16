import React, { useState } from "react";
import { LayoutAnimation, Text, View } from "react-native";
import TutorialModal from "../../../../../../../../global_building_blocks/tutorial/TutorialModal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";
import {
    openedFirstFeed,
    openedFirstWallet,
} from "../../../../../../../../global_state/FirstImpressionsState";
import Modal from "react-native-modal";
import BoltBox from "../../../../../../../../global_building_blocks/bolt_box/BoltBox";
import { palette } from "../../../../../../../../global_styles/Palette";

enum Screens {
    Intro,
    PromptAllPosts,
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
                        setScreen(Screens.PromptAllPosts);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        Here's your feed! {DOUBLE_NEWLINE}
                        ...or what will be your feed. {DOUBLE_NEWLINE}
                        Once you follow other users or communities you'll start
                        receiving their new posts here.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.PromptAllPosts:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        props.hideModal();
                        openedFirstFeed();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        For now, head over to "All Posts" and tap the first
                        digibolt you see.
                    </Text>
                    <View style={instructionStyles.contentContainer}>
                        <BoltBox
                            boltColor={palette.white}
                            amount={0}
                            showAmount={false}
                            boltSize={40}
                        />
                    </View>
                </TutorialModal>
            );
            break;
    }

    return (
        <Modal isVisible={props.visible} style={instructionStyles.modal}>
            {modalContent}
        </Modal>
    );
};

export default InstructionsModal;
