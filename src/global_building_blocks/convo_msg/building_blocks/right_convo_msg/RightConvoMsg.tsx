import React from "react";
import { Animated, Easing, View } from "react-native";
import { Text } from "react-native";
import { styles } from "./RightConvoMsgStyles";
import { millisToRep } from "../../../../global_utils/TimeRepUtils";
import { MessageType } from "../../../../global_types/MessageTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";

interface Props {
    msg: MessageType;
    showUser: boolean;
    animateMsg: boolean;
}

interface State {
    opacity: Animated.Value;
}

export default class RightConvoMsg extends React.PureComponent<Props, State> {
    state = {
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
                    styles.rightMsgContainer,
                    { opacity: this.state.opacity },
                ]}
            >
                <View style={styles.rightMsgBuffer} />
                <View style={styles.rightMsgMain}>
                    <View style={styles.msgBodyContainer}>
                        <View style={styles.rightMsgBody}>
                            <Text style={styles.msgBodyText}>
                                {this.props.msg.content}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rightMsgFooter}>
                        {this.props.showUser && (
                            <View style={styles.msgFooterLeft}>
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
                        <View style={styles.msgFooterRight}>
                            {this.props.showUser && (
                                <Text style={styles.msgDotText}>·</Text>
                            )}
                            <Text style={styles.msgTimeText}>
                                {millisToRep(
                                    Date.now() - parseInt(this.props.msg.time)
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    }
}
