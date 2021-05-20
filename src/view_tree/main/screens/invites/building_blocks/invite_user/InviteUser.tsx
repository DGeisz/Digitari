import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Contact } from "expo-contacts";
import { styles } from "./InviteUserStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import Modal from "react-native-modal";
import { optionsStyles } from "../../../../../../global_styles/OptionsModalStyles";
import { capitalizeWord } from "../../../../../../global_utils/StringUtils";
import * as SMS from "expo-sms";

interface Props {
    contact: Contact;
}

interface State {
    standardVisible: boolean;
    multiVisible: boolean;
}

async function sendMessage(address: string, message: string) {
    await SMS.sendSMSAsync(address, message);
}

export default class InviteUser extends React.PureComponent<Props, State> {
    state = {
        standardVisible: false,
        multiVisible: false,
    };

    render() {
        const { contact } = this.props;

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
                            <View style={optionsStyles.optionsContainer}>
                                {!!contact.phoneNumbers &&
                                    contact.phoneNumbers.map((phoneNumber) => {
                                        return (
                                            <TouchableOpacity
                                                style={
                                                    optionsStyles.optionContainer
                                                }
                                                onPress={async () => {
                                                    if (!!phoneNumber.number) {
                                                        await sendMessage(
                                                            phoneNumber.number,
                                                            `Hi ${contact.firstName}!`
                                                        );
                                                    }
                                                    this.setState({
                                                        multiVisible: false,
                                                    });
                                                }}
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
                                    })}
                            </View>
                            <View style={optionsStyles.modalFooter}>
                                <TouchableOpacity
                                    style={optionsStyles.closeButton}
                                    onPress={() =>
                                        this.setState({ multiVisible: false })
                                    }
                                >
                                    <Text style={optionsStyles.closeButtonText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
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
                            <View style={optionsStyles.modalFooter}>
                                <View style={optionsStyles.footerBar}>
                                    <TouchableOpacity
                                        style={optionsStyles.closeButton}
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
                                        style={optionsStyles.submitButton}
                                        onPress={async () => {
                                            if (
                                                !!contact.phoneNumbers &&
                                                !!contact.phoneNumbers[0] &&
                                                !!contact.phoneNumbers[0].number
                                            ) {
                                                await sendMessage(
                                                    contact.phoneNumbers[0]
                                                        .number,
                                                    `Hi ${contact.firstName}!`
                                                );
                                            }

                                            this.setState({
                                                standardVisible: false,
                                            });
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
