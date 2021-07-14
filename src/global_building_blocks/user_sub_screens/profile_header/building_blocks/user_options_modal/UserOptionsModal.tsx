import React, { useState } from "react";
import * as Linking from "expo-linking";
import { Text, TouchableOpacity, View, Share } from "react-native";
import { modalStyles } from "../../../../../global_styles/OptionsModalStyles";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../global_styles/Palette";
import Modal from "react-native-modal";

const prefix = Linking.createURL("/");

interface Props {
    openReportUser: () => void;
    uid: string;
}

const UserOptionsModal: React.FC<Props> = (props) => {
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

    return (
        <>
            <TouchableOpacity
                style={modalStyles.userIconContainer}
                onPress={() => {
                    setOptionsVisible(true);
                }}
            >
                <Entypo
                    name="dots-three-vertical"
                    size={15}
                    color={palette.semiSoftGray}
                />
            </TouchableOpacity>
            <Modal isVisible={optionsVisible}>
                <View style={modalStyles.modalOuterContainer}>
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.modalHeader}>
                            <Text style={modalStyles.modalHeaderText}>
                                User options
                            </Text>
                        </View>
                        <View style={modalStyles.optionsContainer}>
                            <TouchableOpacity
                                style={modalStyles.optionContainer}
                                onPress={() => {
                                    setOptionsVisible(false);
                                    props.openReportUser();
                                }}
                            >
                                <Text style={modalStyles.reportText}>
                                    Report user
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyles.optionContainer}
                                onPress={async () => {
                                    await Share.share({
                                        message: `${prefix}user/${props.uid}`,
                                    });
                                }}
                            >
                                <Text style={modalStyles.shareText}>
                                    Share profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={modalStyles.modalFooter}>
                            <TouchableOpacity
                                style={modalStyles.closeButton}
                                onPress={() => setOptionsVisible(false)}
                            >
                                <Text style={modalStyles.closeButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default UserOptionsModal;
