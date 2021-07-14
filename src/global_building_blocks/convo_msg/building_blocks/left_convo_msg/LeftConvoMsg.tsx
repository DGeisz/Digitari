import React from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
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
    onBlock: () => void;
    animateMsg: boolean;
}

interface State {
    blockModalVisible: boolean;
    opacity: Animated.Value;
}

export default class LeftConvoMsg extends React.PureComponent<Props, State> {
    state = {
        blockModalVisible: false,
        opacity: new Animated.Value(this.props.animateMsg ? 0 : 1),
    };

    componentDidMount() {
        if (this.props.animateMsg) {
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
    }

    render() {
        return (
            <Animated.View
                style={[
                    styles.leftMsgContainer,
                    { opacity: this.state.opacity },
                ]}
            >
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
                                    {this.props.msg.anonymous ? (
                                        <MaterialCommunityIcons
                                            name="incognito"
                                            size={15}
                                            color={palette.lightGray}
                                        />
                                    ) : (
                                        <Text
                                            style={styles.msgUserText}
                                            numberOfLines={1}
                                        >
                                            {this.props.msg.user}
                                        </Text>
                                    )}
                                </View>
                            )}
                            <View style={styles.leftFooterRight}>
                                {this.props.showUser && (
                                    <Text style={styles.msgDotText}>·</Text>
                                )}
                                <Text style={styles.leftTimeText}>
                                    {millisToRep(
                                        Date.now() -
                                            parseInt(this.props.msg.time)
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
                                body={
                                    "Block message and decrease both of your rankings?"
                                }
                                title={"Block Message"}
                                onConfirm={() => {
                                    this.setState({
                                        blockModalVisible: false,
                                    });
                                    setTimeout(this.props.onBlock, 200);
                                }}
                                onCancel={() =>
                                    this.setState({
                                        blockModalVisible: false,
                                    })
                                }
                            />
                            <TouchableOpacity
                                style={styles.msgBlockButton}
                                onPress={() =>
                                    this.setState({
                                        blockModalVisible: true,
                                    })
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
            </Animated.View>
        );
    }
}
