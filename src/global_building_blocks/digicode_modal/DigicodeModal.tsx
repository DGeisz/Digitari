import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Digicode } from "../../global_types/DigicodeTypes";
import { modalStyles } from "../../global_styles/OptionsModalStyles";
import { styles } from "./DigicodeModalStyles";
import { palette } from "../../global_styles/Palette";

interface Props {
    visible: boolean;
    hide: () => void;
    code: Digicode;
    title: string;
}

const DigicodeModal: React.FC<Props> = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={modalStyles.modalOuterContainer}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalHeader}>
                        <View style={modalStyles.headerBar}>
                            <Text style={modalStyles.modalHeaderText}>
                                {props.title}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.codeContainer}>
                        <QRCode
                            value={JSON.stringify(props.code)}
                            size={150}
                            logo={require("../../../assets/small_coin.png")}
                            logoSize={41}
                            color={palette.deepBlue}
                        />
                    </View>
                    <Text style={styles.modalText}>
                        Use digicode to easily share this profile!
                    </Text>
                    <View style={modalStyles.modalFooter}>
                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={props.hide}
                        >
                            <Text style={modalStyles.closeButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DigicodeModal;
