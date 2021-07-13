import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View, Share } from "react-native";
import Modal from "react-native-modal";
import { modalStyles } from "../../../../../../global_styles/OptionsModalStyles";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import {
    CONVO_TYPENAME,
    ConvoStatus,
    ConvoType,
} from "../../../../../../global_types/ConvoTypes";
import { localHid, localUid } from "../../../../../../global_state/UserState";
import { useMutation } from "@apollo/client";
import {
    DELETE_CONVO,
    DeleteConvoData,
    DeleteConvoVariables,
} from "./gql/Mutations";
import * as Linking from "expo-linking";
import { TutorialContext } from "../../../../../tutorial/context/tutorial_context/TutorialContext";

const prefix = Linking.createURL("/");

interface Props {
    openReportConvo: () => void;
    convo: ConvoType;
    goBack: () => void;
    cvid: string;
    pid: string;
}

const ConvoOptionsModal: React.FC<Props> = (props) => {
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
    const [deleteVisible, setDeleteVisible] = useState<boolean>(false);

    const uid = localUid();
    const hid = localHid();

    const isParticipant =
        uid === props.convo.tid ||
        uid === props.convo.sid ||
        hid === props.convo.sid;

    const [deleteConvoMutation] = useMutation<
        DeleteConvoData,
        DeleteConvoVariables
    >(DELETE_CONVO, {
        variables: {
            cvid: props.convo.id,
        },
        update(cache) {
            cache.modify({
                id: cache.identify({
                    __typename: CONVO_TYPENAME,
                    id: props.convo.id,
                }),
                fields: {
                    status() {
                        return ConvoStatus.Deleted;
                    },
                },
            });

            cache.evict({
                id: cache.identify({
                    __typename: CONVO_TYPENAME,
                    id: props.convo.id,
                }),
            });

            props.goBack();
        },
    });

    const deleteConvo = () => {
        deleteConvoMutation().then();
        setDeleteVisible(false);
    };

    const { tutorialActive } = useContext(TutorialContext);

    return (
        <>
            <TouchableOpacity
                style={modalStyles.iconContainer}
                onPress={() => !tutorialActive && setOptionsVisible(true)}
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
                                Convo options
                            </Text>
                        </View>
                        <View style={modalStyles.optionsContainer}>
                            <TouchableOpacity
                                style={modalStyles.optionContainer}
                                onPress={() => {
                                    setOptionsVisible(false);
                                    props.openReportConvo();
                                }}
                            >
                                <Text style={modalStyles.reportText}>
                                    Report convo
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyles.optionContainer}
                                onPress={async () => {
                                    await Share.share({
                                        message: `${prefix}convo/${props.cvid}/${props.pid}`,
                                    });
                                }}
                            >
                                <Text style={modalStyles.shareText}>
                                    Share convo
                                </Text>
                            </TouchableOpacity>
                            {isParticipant && (
                                <TouchableOpacity
                                    style={modalStyles.optionContainer}
                                    onPress={() => {
                                        setOptionsVisible(false);

                                        setTimeout(() => {
                                            setDeleteVisible(true);
                                        }, 700);
                                    }}
                                >
                                    <Text style={modalStyles.deleteText}>
                                        Delete convo
                                    </Text>
                                </TouchableOpacity>
                            )}
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
            {isParticipant && (
                <Modal isVisible={deleteVisible}>
                    <View style={modalStyles.modalOuterContainer}>
                        <View style={modalStyles.modalContainer}>
                            <View style={modalStyles.modalHeader}>
                                <Text
                                    style={[
                                        modalStyles.modalHeaderText,
                                        { color: palette.danger },
                                    ]}
                                >
                                    Delete convo
                                </Text>
                            </View>
                            <Text style={modalStyles.modalInfoText}>
                                Are you sure you want to delete this convo?
                            </Text>
                            <View style={modalStyles.modalFooter}>
                                <View style={modalStyles.footerBar}>
                                    <TouchableOpacity
                                        style={modalStyles.closeButton}
                                        onPress={() => setDeleteVisible(false)}
                                    >
                                        <Text
                                            style={modalStyles.closeButtonText}
                                        >
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={modalStyles.deleteButton}
                                        onPress={deleteConvo}
                                    >
                                        <Text
                                            style={modalStyles.deleteButtonText}
                                        >
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

export default ConvoOptionsModal;
