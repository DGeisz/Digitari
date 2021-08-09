import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../../global_styles/Palette";
import { styles } from "./TierInfoModalStyles";
import { UserType } from "../../../../../../../global_types/UserTypes";
import { toCommaRep } from "../../../../../../../global_utils/ValueRepUtils";
import {
    BeenBlocked,
    BeenBlockedSymbol,
    Blocked,
    BlockedSymbol,
    SuccessfulConversationsSymbol,
    SuccessfulConvos,
} from "../../../../../../big_three/BigThree";
import Tier from "../../../../../../tier/Tier";
import { localUid } from "../../../../../../../global_state/UserState";

interface Props {
    user: UserType;
}

const TierInfoModal: React.FC<Props> = (props) => {
    const uid = localUid();
    const isMe = uid === props.user.id;

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
                            <Text style={styles.headerTitle}>
                                Convo Streak & Tier
                            </Text>
                        </View>
                        <ScrollView>
                            <View style={styles.calculationContainer}>
                                <Text style={styles.explanationText}>
                                    {isMe ? "Your" : "This user's"} convo streak
                                    is:
                                </Text>
                                <Text style={styles.rankingText}>
                                    {toCommaRep(props.user.ranking)}
                                </Text>
                                <Text style={styles.explanationText}>
                                    ...which qualifies {isMe ? "you" : "them"}{" "}
                                    for tier:
                                </Text>
                                <Tier size={30} ranking={props.user.ranking} />
                            </View>
                            <View style={styles.convoStreakContainer}>
                                <Text style={styles.streakHeader}>
                                    Convo Streak Rules
                                </Text>
                                <View style={styles.ruleContainer}>
                                    <View style={styles.ruleLeft}>
                                        <Text style={styles.ruleBullet}>·</Text>
                                    </View>
                                    <View style={styles.ruleRight}>
                                        <Text style={styles.ruleText}>
                                            Streak increases by one when you
                                            have a successful convo
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.ruleContainer}>
                                    <View style={styles.ruleLeft}>
                                        <Text style={styles.ruleBullet}>·</Text>
                                    </View>
                                    <View style={styles.ruleRight}>
                                        <Text style={styles.ruleText}>
                                            Streak decreases by 25% or 4
                                            (whichever is greater) if one of
                                            your posts or messages is blocked
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.ruleContainer}>
                                    <View style={styles.ruleLeft}>
                                        <Text style={styles.ruleBullet}>·</Text>
                                    </View>
                                    <View style={styles.ruleRight}>
                                        <Text style={styles.ruleText}>
                                            Streak decreases by 10% or 2
                                            (whichever is greater) if you block
                                            someone's message or post
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bigThreeContainer}>
                                <View style={styles.symExpContainer}>
                                    <View style={styles.symExpLeft}>
                                        <View style={styles.symColonContainer}>
                                            <SuccessfulConversationsSymbol
                                                size={18}
                                            />
                                            <Text style={styles.colon}>
                                                {" : "}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.symExpRight}>
                                        <Text style={styles.symExpText}>
                                            Number of successful convos{" "}
                                            {isMe ? "you've" : "this user has"}{" "}
                                            had with other users.
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.symExpContainer}>
                                    <View style={styles.symExpLeft}>
                                        <View style={styles.symColonContainer}>
                                            <BeenBlockedSymbol size={18} />
                                            <Text style={styles.colon}>
                                                {" : "}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.symExpRight}>
                                        <Text style={styles.symExpText}>
                                            Number of times another user has
                                            blocked one of{" "}
                                            {isMe ? "your" : "this user's"}{" "}
                                            convos, messages, or posts.
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.symExpContainer}>
                                    <View style={styles.symExpLeft}>
                                        <View style={styles.symColonContainer}>
                                            <BlockedSymbol size={18} />
                                            <Text style={styles.colon}>
                                                {" : "}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.symExpRight}>
                                        <Text style={styles.symExpText}>
                                            Number of times{" "}
                                            {isMe ? "you've" : "this user has"}{" "}
                                            blocked other users' convos,
                                            messages, or posts.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
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

export default TierInfoModal;
