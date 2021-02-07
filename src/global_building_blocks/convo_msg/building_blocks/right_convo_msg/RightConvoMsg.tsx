import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { ConvoMsgType } from "../../../../global_types/ConvoMsgTypes";
import { styles } from "./RightConvoMsgStyles";
import { millisToRep } from "../../../../global_utils/TimeRepUtils";

interface Props {
    msg: ConvoMsgType;
    showUser: boolean;
}

export default class RightConvoMsg extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.rightMsgContainer}>
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
                                <Text
                                    style={styles.msgUserText}
                                    numberOfLines={1}
                                >
                                    {this.props.msg.user}
                                </Text>
                            </View>
                        )}
                        <View style={styles.msgFooterRight}>
                            {this.props.showUser && (
                                <Text style={styles.msgDotText}>·</Text>
                            )}
                            <Text style={styles.msgTimeText}>
                                {millisToRep(Date.now() - this.props.msg.time)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
