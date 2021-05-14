import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./LevelInfoModalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../../global_styles/Palette";
import { localUid } from "../../../../../../../global_state/UserState";
import { UserType } from "../../../../../../../global_types/UserTypes";
import Modal from "react-native-modal";
import { calculateLevelInfo } from "../../../../../../../global_utils/LevelUtils";
import { toCommaRep } from "../../../../../../../global_utils/ValueRepUtils";

interface Props {
    user: UserType;
}

const LevelInfoModal: React.FC<Props> = (props) => {
    const uid = localUid();
    const isMe = uid === props.user.id;

    const [level, levelGoal, levelProgress] = useMemo<[number, number, number]>(
        () => calculateLevelInfo(props.user.coinSpent),
        [props.user.coinSpent]
    );

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setVisible(true)}
            >
                <FontAwesome
                    name="info"
                    style={styles.icon}
                    color={palette.deepBlue}
                    size={18}
                />
            </TouchableOpacity>
            <Modal isVisible={visible}>
                <View style={styles.modalOuterContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headerTitle}>Level</Text>
                        </View>
                        <Text style={styles.headerBody}>
                            {`To level up in Digitari, you need to spend digicoin on posts, convos, likes, etc.
                            \nRight now ${
                                isMe ? "you are" : "this user is"
                            } at level ${level}. To reach level ${level + 1}, ${
                                isMe ? "you need" : "this user needs"
                            } to spend ${toCommaRep(
                                levelGoal - levelProgress
                            )} more digicoin.
                            `}
                        </Text>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default LevelInfoModal;
