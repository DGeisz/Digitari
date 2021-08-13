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
                        coin and bolts. 👊
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
                        Just write out whatever is on your mind!
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.NextTwoFields:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Recipients);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        At the very top of the screen, select who should get
                        your post in their feed. {DOUBLE_NEWLINE}
                        You can send your post to your personal followers or a
                        Digitari community.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Recipients:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Distribution);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        Finally, pick the number of people who'll get this post
                        in their feed.
                        {DOUBLE_NEWLINE}
                        Want 10k people to see your dank meme? Go right ahead!
                        It just costs 10 digicoin per person.
                    </Text>
                </TutorialModal>
            );
            break;
        case Screens.Distribution:
            modalContent = (
                <TutorialModal
                    top={false}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setScreen(Screens.Finish);
                    }}
                    footerText={"Next"}
                >
                    <Text style={instructionStyles.instructionText}>
                        Don't worry -- all{" "}
                        <Text style={instructionStyles.italics}>you</Text> have
                        to do is tell us how many people should see your post.
                        {DOUBLE_NEWLINE}
                        After you post, we'll choose that number of people from
                        your selected audience and send your post directly to
                        their feeds. Easy, peasy😊
                        {DOUBLE_NEWLINE}
                        Plus, you get a digibolt for every person you send your
                        post to!
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
                        You'll earn a bunch of digicoin when people collect
                        digibolts from your posts.
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
