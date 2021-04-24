import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./LeftConvoMsgStyles";
import { millisToRep } from "../../../../global_utils/TimeRepUtils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import CancelConfirmModal from "../../../cancel_confirm_modal/CancelConfirmModal";
import { MessageType } from "../../../../global_types/MessageTypes";

interface Props {
    msg: MessageType;
    showUser: boolean;
    showBlockMsg: boolean;
    blockMessage: string;
    onBlock: () => void;
}

interface State {
    blockModalVisible: boolean;
}

export default class LeftConvoMsg extends React.PureComponent<Props, State> {
    state = {
        blockModalVisible: false,
    };

    render() {
        return (
            <View style={styles.leftMsgContainer}>
                <View style={styles.leftMsgMain}>
                    <View style={styles.msgBodyContainer}>
                        <View style={styles.leftMainBody}>
                            <Text style={styles.leftMainText}>
                                {this.props.msg.content}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.leftMainFooter}>
                        <View style={styles.mainFooterContainer}>
                            {this.props.showUser && (
                                <View style={styles.leftFooterLeft}>
                                    <Text
                                        style={styles.msgUserText}
                                        numberOfLines={1}
                                    >
                                        {this.props.msg.user}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.leftFooterRight}>
                                {this.props.showUser && (
                                    <Text style={styles.msgDotText}>·</Text>
                                )}
                                <Text style={styles.leftTimeText}>
                                    {millisToRep(
                                        Date.now() - this.props.msg.time
                                    )}
                                </Text>
                            </View>
                            {/*</View>*/}
                        </View>
                    </View>
                </View>
                {this.props.showBlockMsg && (
                    <>
                        <View style={styles.msgBlockContainer}>
                            <CancelConfirmModal
                                confirmTextColor={palette.warning}
                                confirmBackgroundColor={palette.warningLight}
                                confirmMessage={"Block"}
                                visible={this.state.blockModalVisible}
                                body={this.props.blockMessage}
                                title={"Block Message"}
                                onConfirm={() => {
                                    this.setState({ blockModalVisible: false });
                                    setTimeout(this.props.onBlock, 200);
                                }}
                                onCancel={() =>
                                    this.setState({ blockModalVisible: false })
                                }
                            />
                            <TouchableOpacity
                                style={styles.msgBlockButton}
                                onPress={() =>
                                    this.setState({ blockModalVisible: true })
                                }
                            >
                                <MaterialCommunityIcons
                                    name="hand-left"
                                    color={palette.warning}
                                    size={15}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        );
    }
}
