import * as React from "react";
import { styles } from "./ResponseResponseStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../../global_styles/Palette";
import CancelConfirmModal from "../../../../../global_building_blocks/cancel_confirm_modal/CancelConfirmModal";

interface Props {
    respondModalMessage: string;
    onBlock: () => void;
    onDismiss: () => void;
    onMessage: () => void;
}

interface State {
    blockVisible: boolean;
    dismissVisible: boolean;
    messageVisible: boolean;
}

export default class ResponseResponse extends React.PureComponent<
    Props,
    State
> {
    state = {
        blockVisible: false,
        dismissVisible: false,
        messageVisible: false,
    };

    render() {
        return (
            <View style={styles.rRContainer}>
                <CancelConfirmModal
                    visible={this.state.blockVisible}
                    body="Block convo?"
                    title="Block"
                    onConfirm={() => {
                        this.setState({ blockVisible: false });
                        this.props.onBlock();
                    }}
                    confirmBackgroundColor={palette.warningLight}
                    confirmTextColor={palette.warning}
                    confirmMessage="Block"
                    onCancel={() => this.setState({ blockVisible: false })}
                />
                <CancelConfirmModal
                    visible={this.state.dismissVisible}
                    body="Dismiss convo?"
                    title="Dismiss"
                    onConfirm={() => {
                        this.setState({ dismissVisible: false });
                        this.props.onDismiss();
                    }}
                    confirmMessage="Dismiss"
                    onCancel={() => this.setState({ dismissVisible: false })}
                />
                <CancelConfirmModal
                    visible={this.state.messageVisible}
                    body={this.props.respondModalMessage}
                    title="Respond"
                    confirmBackgroundColor={palette.oceanSurf}
                    confirmTextColor={palette.deepBlue}
                    onConfirm={() => {
                        this.setState({ messageVisible: false });
                        this.props.onMessage();
                    }}
                    confirmMessage="Respond"
                    onCancel={() => this.setState({ messageVisible: false })}
                />
                <View style={styles.rRLeft}>
                    <View style={styles.rRLeftLeft}>
                        <TouchableOpacity
                            style={styles.dismissButton}
                            onPress={() =>
                                this.setState({ dismissVisible: true })
                            }
                        >
                            <Entypo
                                name="cross"
                                size={20}
                                color={palette.mediumGray}
                            />
                            <Text style={styles.dismissText}>Dismiss</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rRLeftRight}>
                        <TouchableOpacity
                            style={styles.blockButton}
                            onPress={() =>
                                this.setState({ blockVisible: true })
                            }
                        >
                            <MaterialCommunityIcons
                                name="hand-left"
                                color={palette.warning}
                                size={20}
                            />
                            <Text style={styles.blockText}>Block</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rRRight}>
                    <TouchableOpacity
                        style={styles.respondButton}
                        onPress={() => this.setState({ messageVisible: true })}
                    >
                        <Ionicons
                            name="chatbubble"
                            size={20}
                            color={palette.deepBlue}
                        />
                        <Text style={styles.respondText}>Respond</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
