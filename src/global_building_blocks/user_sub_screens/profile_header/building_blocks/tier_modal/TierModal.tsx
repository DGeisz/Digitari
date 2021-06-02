import React, { useContext } from "react";
import Modal from "react-native-modal";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TierModalStyles";
import TierInfo from "./building_blocks/tier_info/TierInfo";
import { TierEnum } from "../../../../../global_types/TierTypes";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../view_tree/context/tutorial_context/TutorialContext";

interface Props {
    visible: boolean;
    hide: () => void;
}

const TierModal: React.FC<Props> = (props) => {
    const { tutorialActive, tutorialScreen, advanceTutorial } = useContext(
        TutorialContext
    );

    return (
        <Modal isVisible={props.visible}>
            <View style={styles.modalOuterContainer}>
                <View style={styles.modalContainer} pointerEvents="box-none">
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Tiers</Text>
                    </View>
                    <ScrollView>
                        <TierInfo tier={TierEnum.Angel} />
                        <TierInfo tier={TierEnum.HeartEyes} />
                        <TierInfo tier={TierEnum.Sunglasses} />
                        <TierInfo tier={TierEnum.Hugging} />
                        <TierInfo tier={TierEnum.Grinning} />
                        <TierInfo tier={TierEnum.Smiling} />
                        <TierInfo tier={TierEnum.SlightlySmiling} />
                        <TierInfo tier={TierEnum.Frowning} />
                        <TierInfo tier={TierEnum.Steam} />
                        <TierInfo tier={TierEnum.AngryHorns} />
                    </ScrollView>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                props.hide();

                                if (
                                    tutorialActive &&
                                    tutorialScreen === TutorialScreen.TapTier
                                ) {
                                    setTimeout(() => {
                                        advanceTutorial();
                                    }, 500);
                                }
                            }}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TierModal;
