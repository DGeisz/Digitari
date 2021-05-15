import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { optionsStyles } from "../../../../../global_styles/OptionsModalStyles";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../global_styles/Palette";
import Modal from "react-native-modal";

interface Props {
    openReportUser: () => void;
}

const UserOptionsModal: React.FC<Props> = (props) => {
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

    return (
        <>
            <TouchableOpacity
                style={optionsStyles.userIconContainer}
                onPress={() => setOptionsVisible(true)}
            >
                <Entypo
                    name="dots-three-vertical"
                    size={15}
                    color={palette.semiSoftGray}
                />
            </TouchableOpacity>
            <Modal isVisible={optionsVisible}>
                <View style={optionsStyles.modalOuterContainer}>
                    <View style={optionsStyles.modalContainer}>
                        <View style={optionsStyles.modalHeader}>
                            <Text style={optionsStyles.modalHeaderText}>
                                User options
                            </Text>
                        </View>
                        <View style={optionsStyles.optionsContainer}>
                            <TouchableOpacity
                                style={optionsStyles.optionContainer}
                                onPress={() => {
                                    setOptionsVisible(false);
                                    props.openReportUser();
                                }}
                            >
                                <Text style={optionsStyles.reportText}>
                                    Report user
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={optionsStyles.modalFooter}>
                            <TouchableOpacity
                                style={optionsStyles.closeButton}
                                onPress={() => setOptionsVisible(false)}
                            >
                                <Text style={optionsStyles.closeButtonText}>
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
