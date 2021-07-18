import React, { useState } from "react";
import Modal from "react-native-modal";
import { instructionStyles } from "../../../../../../../../global_styles/InstructionStyles";
import TutorialModal from "../../../../../../../../global_building_blocks/tutorial/TutorialModal";
import { LayoutAnimation, Text } from "react-native";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";
import { openedFirstPost } from "../../../../../../../../global_state/FirstImpressionsState";

enum Screens {
    Intro,
    Content,
    NextTwoFields,
    Target,
    Recipients,
    Distribution,
    Finish,
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
                        setScreen(Screens.Content);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        Wanna post something? {DOUBLE_NEWLINE}
                        Good idea -- posting is a great way to make a TON of
                        digicoin. 👊
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Content:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.NextTwoFields);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        Posting is super easy😊
                        {DOUBLE_NEWLINE}
                        In the top field, just type out whatever is on your
                        mind!
                        {DOUBLE_NEWLINE}
                        You can also include extra content in the "Add-on" field
                        if you want.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.NextTwoFields:
            modalContent = (
                <TutorialModal
                    top
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Target);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        The "Target" and "Recipients" fields give you an easy
                        way to take total control over who sees your content.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Target:
            modalContent = (
                <TutorialModal
                    top
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Recipients);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        In "Target," pick a group of people who'll appreciate
                        your post! {DOUBLE_NEWLINE}
                        You can either send your post to your personal followers
                        or the members of any Digitari community.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Recipients:
            modalContent = (
                <TutorialModal
                    top
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Distribution);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        In "Recipients," YOU get to pick how many people from
                        your Target will get your post.
                        {DOUBLE_NEWLINE}
                        Want 10k people to see your doge meme? Go right ahead!
                        It just costs 10 digicoin per recipient.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Distribution:
            modalContent = (
                <TutorialModal
                    top
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Finish);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        All you have to do is tell us how many people should see
                        your post. {DOUBLE_NEWLINE}
                        We'll pick that number of people from your Target and
                        send your post directly to their feeds. Easy, peasy😊
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Finish:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        openedFirstPost();
                        props.hideModal();
                    }}
                >
                    <Text style={instructionStyles.instructionText}>
                        Don't be shy, share your interests with the world!{" "}
                        {DOUBLE_NEWLINE}
                        You earn digicoin when people collect digibolts from
                        your posts, so your posts will make you a bunch of coin.
                        {DOUBLE_NEWLINE}
                        ...which lets you post to more people! Keep going and
                        you'll be famous in no time😎
                    </Text>
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
