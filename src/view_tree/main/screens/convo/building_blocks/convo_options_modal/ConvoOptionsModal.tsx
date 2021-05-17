import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { optionsStyles } from "../../../../../../global_styles/OptionsModalStyles";
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
import { cache } from "../../../../../../global_state/Cache";

interface Props {
    openReportConvo: () => void;
    convo: ConvoType;
    goBack: () => void;
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

    return (
        <>
            <TouchableOpacity
                style={optionsStyles.iconContainer}
                onPress={() => setOptionsVisible(true)}
            >
                <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color={palette.lightGray}
                />
            </TouchableOpacity>
            <Modal isVisible={optionsVisible}>
                <View style={optionsStyles.modalOuterContainer}>
                    <View style={optionsStyles.modalContainer}>
                        <View style={optionsStyles.modalHeader}>
                            <Text style={optionsStyles.modalHeaderText}>
                                Convo options
                            </Text>
                        </View>
                        <View style={optionsStyles.optionsContainer}>
                            <TouchableOpacity
                                style={optionsStyles.optionContainer}
                                onPress={() => {
                                    setOptionsVisible(false);
                                    props.openReportConvo();
                                }}
                            >
                                <Text style={optionsStyles.reportText}>
                                    Report convo
                                </Text>
                            </TouchableOpacity>
                            {isParticipant && (
                                <TouchableOpacity
                                    style={optionsStyles.optionContainer}
                                    onPress={() => {
                                        setOptionsVisible(false);

                                        setTimeout(() => {
                                            setDeleteVisible(true);
                                        }, 700);
                                    }}
                                >
                                    <Text style={optionsStyles.deleteText}>
                                        Delete convo
                                    </Text>
                                </TouchableOpacity>
                            )}
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
            {isParticipant && (
                <Modal isVisible={deleteVisible}>
                    <View style={optionsStyles.modalOuterContainer}>
                        <View style={optionsStyles.modalContainer}>
                            <View style={optionsStyles.modalHeader}>
                                <Text
                                    style={[
                                        optionsStyles.modalHeaderText,
                                        { color: palette.danger },
                                    ]}
                                >
                                    Delete convo
                                </Text>
                            </View>
                            <Text style={optionsStyles.modalInfoText}>
                                Are you sure you want to delete this convo?
                            </Text>
                            <View style={optionsStyles.modalFooter}>
                                <View style={optionsStyles.footerBar}>
                                    <TouchableOpacity
                                        style={optionsStyles.closeButton}
                                        onPress={() => setDeleteVisible(false)}
                                    >
                                        <Text
                                            style={
                                                optionsStyles.closeButtonText
                                            }
                                        >
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={optionsStyles.deleteButton}
                                        onPress={deleteConvo}
                                    >
                                        <Text
                                            style={
                                                optionsStyles.deleteButtonText
                                            }
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
