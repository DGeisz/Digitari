import React from "react";
import { palette } from "../../global_styles/Palette";
import Modal from "react-native-modal";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CancelConfirmModalStyles";

interface Props {
    visible: boolean;
    title: string;
    body: string;
    error?: string;
    loading?: boolean;
    confirmBackgroundColor?: string;
    confirmTextColor?: string;
    confirmMessage?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default class CancelConfirmModal extends React.PureComponent<Props> {
    static defaultProps = {
        confirmBackgroundColor: palette.primaryLight,
        confirmTextColor: palette.primary,
        confirmMessage: "OK",
    };

    render() {
        return (
            <Modal isVisible={this.props.visible} animationOutTiming={100}>
                <View style={styles.outerContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.titleText}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.modalBody}>
                            {!!this.props.error && (
                                <Text style={styles.errorText}>
                                    {this.props.error}
                                </Text>
                            )}
                            <Text style={styles.bodyText}>
                                {this.props.body}
                            </Text>
                        </View>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={this.props.onCancel}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            {this.props.loading ? (
                                <View style={styles.confirmButton}>
                                    <ActivityIndicator
                                        size="small"
                                        color={palette.deepBlue}
                                    />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={[
                                        styles.confirmButton,
                                        {
                                            backgroundColor: this.props
                                                .confirmBackgroundColor,
                                        },
                                    ]}
                                    onPress={this.props.onConfirm}
                                >
                                    <Text
                                        style={[
                                            styles.confirmText,
                                            {
                                                color: this.props
                                                    .confirmTextColor,
                                            },
                                        ]}
                                    >
                                        {this.props.confirmMessage}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
