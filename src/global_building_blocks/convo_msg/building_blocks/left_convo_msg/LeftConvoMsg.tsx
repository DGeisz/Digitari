import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ConvoMsgType } from "../../../../global_types/ConvoMsgTypes";
import { styles } from "./LeftConvoMsgStyles";
import { millisToRep } from "../../../../global_utils/TimeRepUtils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";

interface Props {
    msg: ConvoMsgType;
    showUser: boolean;
    showBlockMsg: boolean;
}

export default class LeftConvoMsg extends React.PureComponent<Props> {
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
                            {/*<View>*/}
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
                    <View style={styles.msgBlockContainer}>
                        <TouchableOpacity style={styles.msgBlockButton}>
                            <MaterialCommunityIcons
                                name="hand-left"
                                color={palette.warning}
                                size={15}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}
