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

const LeftConvoMsg: React.FC<Props> = ({ msg, showBlockMsg, showUser }) => {
    return (
        <View style={styles.leftMsgContainer}>
            <View style={styles.leftMsgMain}>
                <View style={styles.msgBodyContainer}>
                    <View style={styles.leftMainBody}>
                        <Text style={styles.leftMainText}>{msg.content}</Text>
                    </View>
                </View>
                <View style={styles.leftMainFooter}>
                    <View style={styles.mainFooterContainer}>
                        {/*<View>*/}
                        {showUser && (
                            <View style={styles.leftFooterLeft}>
                                <Text
                                    style={styles.msgUserText}
                                    numberOfLines={1}
                                >
                                    {msg.user}
                                </Text>
                            </View>
                        )}
                        <View style={styles.leftFooterRight}>
                            {showUser && (
                                <Text style={styles.msgDotText}>·</Text>
                            )}
                            <Text style={styles.leftTimeText}>
                                {millisToRep(Date.now() - msg.time)}
                            </Text>
                        </View>
                        {/*</View>*/}
                    </View>
                </View>
            </View>
            {showBlockMsg && (
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
};

export default LeftConvoMsg;
