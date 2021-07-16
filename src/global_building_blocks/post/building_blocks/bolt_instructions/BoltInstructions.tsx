import React, { useState } from "react";
import { LayoutAnimation, Text, View } from "react-native";
import TutorialModal from "../../../tutorial/TutorialModal";
import { instructionStyles } from "../../../../global_styles/InstructionStyles";
import { DOUBLE_NEWLINE } from "../../../../global_utils/StringUtils";
import {
    openedFirstFeed,
    tappedFirstBolt,
} from "../../../../global_state/FirstImpressionsState";
import BoltBox from "../../../bolt_box/BoltBox";
import { palette } from "../../../../global_styles/Palette";
import Modal from "react-native-modal";

enum Screens {
    Intro,
    ExplainLikes,
}

interface Props {
    hideModal: () => void;
    visible: boolean;
}

const BoltInstructions: React.FC<Props> = (props) => {
    const [screen, setScreen] = useState<Screens>(Screens.Intro);

    let modalContent;
    switch (screen) {
        case Screens.Intro:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.ExplainLikes);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        You collected your first digibolt! 🎉{DOUBLE_NEWLINE}
                        You'll use digibolts to upgrade your account.
                        {DOUBLE_NEWLINE}
                        Each post has a couple digibolts for you to collect, and
                        each bolt costs 10 digicoin.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.ExplainLikes:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Intro);
                        // props.hideModal();
                        // tappedFirstBolt();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        The digicoin you spend on digibolts goes to the post
                        creator, so try to only collect bolts from posts you
                        like.
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

export default BoltInstructions;
