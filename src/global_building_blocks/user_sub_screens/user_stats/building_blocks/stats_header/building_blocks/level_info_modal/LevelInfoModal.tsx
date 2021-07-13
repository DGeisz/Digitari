import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./LevelInfoModalStyles";
import { localUid } from "../../../../../../../global_state/UserState";
import { UserType } from "../../../../../../../global_types/UserTypes";
import Modal from "react-native-modal";
import { calculateLevelInfo } from "../../../../../../../global_utils/LevelUtils";
import { toCommaRep } from "../../../../../../../global_utils/ValueRepUtils";
import { DOUBLE_NEWLINE } from "../../../../../../../global_utils/StringUtils";

interface Props {
    user: UserType;
    visible: boolean;
    hide: () => void;
}

const LevelInfoModal: React.FC<Props> = (props) => {
    const uid = localUid();
    const isMe = uid === props.user.id;

    const [level, levelGoal, levelProgress] = useMemo<[number, number, number]>(
        () => calculateLevelInfo(props.user.coinSpent),
        [props.user.coinSpent]
    );

    return (
        <>
            <Modal isVisible={props.visible}>
                <View style={styles.modalOuterContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headerTitle}>Level</Text>
                        </View>
                        <Text style={styles.headerBody}>
                            If you want to flex on the haters, you need to level
                            up.{DOUBLE_NEWLINE}
                            And to level up, you need to spend digicoin on posts
                            or digibolts.{DOUBLE_NEWLINE}
                            Right now {isMe ? "you are" : "this user is"} at
                            level {toCommaRep(level)}.{" "}
                            <Text style={styles.boldText}>
                                To reach level {toCommaRep(level + 1)},
                                {isMe ? " you need" : " this user needs"} to
                                spend {toCommaRep(levelGoal - levelProgress)}{" "}
                                more digicoin.{" "}
                            </Text>
                            {DOUBLE_NEWLINE}
                            {isMe ? `Go get em', tiger.` : ""}
                        </Text>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={props.hide}
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
