import React, { useContext, useState } from "react";
import * as Linking from "expo-linking";
import { Text, TouchableOpacity, View, Share } from "react-native";
import { optionsStyles } from "../../../../../global_styles/OptionsModalStyles";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../global_styles/Palette";
import Modal from "react-native-modal";
import { TutorialContext } from "../../../../../view_tree/context/tutorial_context/TutorialContext";

const prefix = Linking.createURL("/");

interface Props {
    openReportUser: () => void;
    uid: string;
}

const UserOptionsModal: React.FC<Props> = (props) => {
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

    const { tutorialActive } = useContext(TutorialContext);

    return (
        <>
            <TouchableOpacity
                style={optionsStyles.userIconContainer}
                onPress={() => {
                    if (!tutorialActive) {
                        setOptionsVisible(true);
                    }
                }}
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
                            <TouchableOpacity
                                style={optionsStyles.optionContainer}
                                onPress={async () => {
                                    await Share.share({
                                        message: `${prefix}user/${props.uid}`,
                                    });
                                }}
                            >
                                <Text style={optionsStyles.shareText}>
                                    Share profile
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
