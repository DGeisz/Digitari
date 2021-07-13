import React, { useState } from "react";
import { Text, TouchableOpacity, View, Share } from "react-native";
import { modalStyles } from "../../../../../../../../global_styles/OptionsModalStyles";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../../../../global_styles/Palette";
import Modal from "react-native-modal";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

interface Props {
    openReportCommunity: () => void;
    cmid: string;
}

const CommunityOptionsModal: React.FC<Props> = (props) => {
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

    return (
        <>
            <TouchableOpacity
                style={modalStyles.userIconContainer}
                onPress={() => setOptionsVisible(true)}
            >
                <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color={palette.lightGray}
                />
            </TouchableOpacity>
            <Modal isVisible={optionsVisible}>
                <View style={modalStyles.modalOuterContainer}>
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.modalHeader}>
                            <Text style={modalStyles.modalHeaderText}>
                                Community options
                            </Text>
                        </View>

                        <View style={modalStyles.optionsContainer}>
                            <TouchableOpacity
                                style={modalStyles.optionContainer}
                                onPress={() => {
                                    setOptionsVisible(false);
                                    props.openReportCommunity();
                                }}
                            >
                                <Text style={modalStyles.reportText}>
                                    Report community
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyles.optionContainer}
                                onPress={async () => {
                                    await Share.share({
                                        message: `${prefix}community/${props.cmid}`,
                                    });
                                }}
                            >
                                <Text style={modalStyles.shareText}>
                                    Share community
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

export default CommunityOptionsModal;
