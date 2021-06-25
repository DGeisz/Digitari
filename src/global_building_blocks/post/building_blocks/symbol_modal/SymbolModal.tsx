import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { styles } from "./SymbolModalStyles";
import { palette } from "../../../../global_styles/Palette";
import { SuccessfulConversationsSymbol } from "../../../big_three/BigThree";
import CoinBox from "../../../coin_box/CoinBox";

interface Props {
    visible: boolean;
    hide: () => void;
}

const SymbolModal: React.FC<Props> = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.outerContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.headerTitle}>Post symbols</Text>
                    </View>
                    <View style={styles.symExpContainer}>
                        <View style={styles.symExpLeft}>
                            <View style={styles.symColonContainer}>
                                <CoinBox
                                    active={false}
                                    showAmount={false}
                                    coinSize={30}
                                />
                                <Text style={styles.colon}>{" : "}</Text>
                            </View>
                        </View>
                        <View style={styles.symExpRight}>
                            <Text style={styles.symExpText}>
                                This is the amount of digicoin this post has
                                earned
                            </Text>
                        </View>
                    </View>
                    <View style={styles.symExpContainer}>
                        <View style={styles.symExpLeft}>
                            <View style={styles.symColonContainer}>
                                <Ionicons
                                    name="chatbubbles"
                                    size={25}
                                    color={palette.semiSoftGray}
                                />
                                <Text style={styles.colon}>{" : "}</Text>
                            </View>
                        </View>
                        <View style={styles.symExpRight}>
                            <Text style={styles.symExpText}>
                                This is the number of convos that have been
                                created about this post
                            </Text>
                        </View>
                    </View>
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

export default SymbolModal;
