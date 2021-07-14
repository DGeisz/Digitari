import React from "react";
import Modal from "react-native-modal";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TierModalStyles";
import TierInfo from "./building_blocks/tier_info/TierInfo";
import { TierEnum } from "../../../../../global_types/TierTypes";
import { DOUBLE_NEWLINE } from "../../../../../global_utils/StringUtils";

interface Props {
    visible: boolean;
    hide: () => void;
}

const TierModal: React.FC<Props> = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.modalOuterContainer}>
                <View style={styles.modalContainer} pointerEvents="box-none">
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Tiers</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>
                                Your tier basically shows the world whether
                                you're nice or a total troll.{DOUBLE_NEWLINE}
                                Your ranking qualifies you for different tiers,
                                so to increase your tier, you gotta boost your
                                ranking.
                                {DOUBLE_NEWLINE}
                                Here are the 10 tiers:
                            </Text>
                        </View>
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
                            onPress={props.hide}
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
