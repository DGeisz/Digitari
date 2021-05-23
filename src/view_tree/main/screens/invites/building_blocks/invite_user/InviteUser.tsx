import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Contact, PhoneNumber } from "expo-contacts";
import { styles } from "./InviteUserStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import Modal from "react-native-modal";
import { optionsStyles } from "../../../../../../global_styles/OptionsModalStyles";
import { capitalizeWord } from "../../../../../../global_utils/StringUtils";
import * as SMS from "expo-sms";
import { FetchResult } from "@apollo/client";
import { GenInviteCodeData } from "../../gql/Mutations";
import { createMessage } from "./utils/message_utils";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";

interface Props {
    contact: Contact;
    genInviteCode: () => Promise<FetchResult<GenInviteCodeData>>;
}

interface State {
    standardVisible: boolean;
    multiVisible: boolean;
    loading: boolean;
    error: boolean;
}

export default class InviteUser extends React.PureComponent<Props, State> {
    state = {
        standardVisible: false,
        multiVisible: false,
        loading: false,
        error: false,
    };

    render() {
        const { contact } = this.props;

        const sendCode = async (phoneNumber: PhoneNumber) => {
            this.setState({
                loading: true,
            });

            try {
                if (!!phoneNumber.number && (await SMS.isAvailableAsync())) {
                    const { data } = await this.props.genInviteCode();

                    if (!!data?.genInviteCode) {
                        await SMS.sendSMSAsync(
                            phoneNumber.number,
                            createMessage(
                                !!contact.firstName ? contact.firstName : "",
                                data.genInviteCode
                            )
                        );
                    } else {
                        this.setState({
                            error: true,
                        });
                    }
                }

                this.setState({
                    multiVisible: false,
                    standardVisible: false,
                    loading: false,
                    error: false,
                });
            } catch (e) {
                this.setState({
                    error: true,
                    loading: false,
                });
            }
        };

        return (
            <>
                <Modal isVisible={this.state.multiVisible}>
                    <View style={optionsStyles.modalOuterContainer}>
                        <View style={optionsStyles.modalContainer}>
                            <View style={optionsStyles.modalHeader}>
                                <Text style={optionsStyles.modalHeaderText}>
                                    Invite {contact.firstName}
                                </Text>
                            </View>
                            {this.state.error && (
                                <Text style={optionsStyles.modalErrorText}>
                                    Hmm, something went wrong. Give us a sec and
                                    try again
                                </Text>
                            )}
                            <View style={optionsStyles.optionsContainer}>
                                {!!contact.phoneNumbers &&
                                    contact.phoneNumbers.map(
                                        (phoneNumber, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={`${this.props.contact.id}:${index}`}
                                                    style={
                                                        optionsStyles.optionContainer
                                                    }
                                                    onPress={async () =>
                                                        await sendCode(
                                                            phoneNumber
                                                        )
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.phoneNumberContainer
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.phoneNumberLabel
                                                            }
                                                        >
                                                            {!!phoneNumber.label
                                                                ? capitalizeWord(
                                                                      phoneNumber.label
                                                                  )
                                                                : "Other"}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.phoneNumberText
                                                            }
                                                        >
                                                            {phoneNumber.number}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }
                                    )}
                            </View>
                            <View style={optionsStyles.modalFooter}>
                                {this.state.loading ? (
                                    <LoadingWheel />
                                ) : (
                                    <TouchableOpacity
                                        style={optionsStyles.closeButton}
                                        onPress={() =>
                                            this.setState({
                                                multiVisible: false,
                                            })
                                        }
                                    >
                                        <Text
                                            style={
                                                optionsStyles.closeButtonText
                                            }
                                        >
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.standardVisible}>
                    <View style={optionsStyles.modalOuterContainer}>
                        <View style={optionsStyles.modalContainer}>
                            <View style={optionsStyles.modalHeader}>
                                <Text style={optionsStyles.modalHeaderText}>
                                    Invite {contact.firstName}?
                                </Text>
                            </View>
                            {this.state.error && (
                                <Text style={optionsStyles.modalErrorText}>
                                    Hmm, something went wrong. Give us a sec and
                                    try again
                                </Text>
                            )}
                            <View style={optionsStyles.modalFooter}>
                                <View style={optionsStyles.footerBar}>
                                    {this.state.loading ? (
                                        <LoadingWheel />
                                    ) : (
                                        <>
                                            <TouchableOpacity
                                                style={
                                                    optionsStyles.closeButton
                                                }
                                                onPress={() =>
                                                    this.setState({
                                                        standardVisible: false,
                                                    })
                                                }
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
                                                style={
                                                    optionsStyles.submitButton
                                                }
                                                onPress={async () => {
                                                    if (
                                                        !!contact.phoneNumbers &&
                                                        !!contact
                                                            .phoneNumbers[0] &&
                                                        !!contact
                                                            .phoneNumbers[0]
                                                            .number
                                                    ) {
                                                        await sendCode(
                                                            contact
                                                                .phoneNumbers[0]
                                                        );
                                                    } else {
                                                        this.setState({
                                                            error: true,
                                                        });
                                                    }
                                                }}
                                            >
                                                <Text
                                                    style={
                                                        optionsStyles.submitButtonText
                                                    }
                                                >
                                                    Send invite
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                        if (
                            !!contact.phoneNumbers &&
                            contact.phoneNumbers.length === 1
                        ) {
                            this.setState({ standardVisible: true });
                        } else {
                            this.setState({ multiVisible: true });
                        }
                    }}
                >
                    {!!contact.imageAvailable && !!contact.image?.uri ? (
                        <Image
                            style={styles.image}
                            source={{ uri: contact.image.uri }}
                        />
                    ) : (
                        <View style={styles.iconContainer}>
                            <FontAwesome
                                name="user"
                                color={palette.white}
                                size={23}
                            />
                        </View>
                    )}
                    <Text style={styles.nameText}>{contact.name}</Text>
                </TouchableOpacity>
            </>
        );
    }
}
