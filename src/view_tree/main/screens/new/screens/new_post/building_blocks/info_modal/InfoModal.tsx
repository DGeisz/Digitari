import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { styles } from "./InfoModalStyles";
import { TouchableOpacity, View, Text } from "react-native";
import { palette } from "../../../../../../../../global_styles/Palette";

interface Props {
    title: string;
    content: string;
}

const InfoModal: React.FC<Props> = (props) => {
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
                    size={20}
                />
            </TouchableOpacity>
            <Modal
                isVisible={visible}
                onSwipeComplete={() => setVisible(false)}
                swipeDirection="down"
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => setVisible(false)}
                    activeOpacity={1}
                >
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>{props.title}</Text>
                        <Text style={styles.infoText}>{props.content}</Text>
                        <View style={styles.infoFooter}>
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
                </TouchableOpacity>
            </Modal>
        </>
    );
};

export default InfoModal;
