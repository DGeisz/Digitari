import React from "react";
import { styles } from "./ResponseResponseStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import CancelConfirmModal from "../../../../../../global_building_blocks/cancel_confirm_modal/CancelConfirmModal";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import { CONVO_ACTIVATION_COST } from "../../../../../../global_types/ConvoTypes";

interface Props {
    userBolts: number;
    onBlock: () => void;
    onDismiss: () => void;
    onRespond: () => void;
}

interface State {
    blockVisible: boolean;
    dismissVisible: boolean;
    messageVisible: boolean;
    responseError: boolean;
    loading: boolean;
}

export default class ResponseResponse extends React.PureComponent<
    Props,
    State
> {
    state = {
        blockVisible: false,
        dismissVisible: false,
        messageVisible: false,
        responseError: false,
        loading: false,
    };

    render() {
        return (
            <View style={styles.rRContainer}>
                <CancelConfirmModal
                    visible={this.state.blockVisible}
                    body="Block convo and decrease both of your convo streaks?"
                    title="Block"
                    onConfirm={() => {
                        this.setState({ blockVisible: false, loading: true });
                        setTimeout(() => {
                            this.props.onBlock();
                        }, 500);
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
                        this.setState({ dismissVisible: false, loading: true });
                        setTimeout(() => {
                            this.props.onDismiss();
                        }, 500);
                    }}
                    confirmMessage="Dismiss"
                    onCancel={() => this.setState({ dismissVisible: false })}
                />
                <CancelConfirmModal
                    visible={this.state.messageVisible}
                    body={`Use ${toCommaRep(
                        CONVO_ACTIVATION_COST
                    )} digibolts to respond to this convo?`}
                    title="Respond"
                    error={
                        this.state.responseError
                            ? "You don't have enough digibolts!"
                            : undefined
                    }
                    onConfirm={() => {
                        if (this.props.userBolts < CONVO_ACTIVATION_COST) {
                            this.setState({ responseError: true });
                        } else {
                            this.setState({
                                messageVisible: false,
                                loading: true,
                            });
                            setTimeout(() => {
                                this.props.onRespond();
                            }, 500);
                        }
                    }}
                    confirmMessage="Respond"
                    onCancel={() => this.setState({ messageVisible: false })}
                />
                {this.state.loading ? (
                    <LoadingWheel />
                ) : (
                    <>
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
                                    <Text style={styles.dismissText}>
                                        Dismiss
                                    </Text>
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
                                onPress={() =>
                                    this.setState({ messageVisible: true })
                                }
                            >
                                <Ionicons
                                    name="chatbubble"
                                    size={20}
                                    color={palette.deepBlue}
                                />
                                <Text style={styles.respondText}>Respond</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        );
    }
}
