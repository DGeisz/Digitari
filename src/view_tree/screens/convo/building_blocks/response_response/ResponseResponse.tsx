import * as React from "react";
import { styles } from "./ResponseResponseStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../../global_styles/Palette";

export default class ResponseResponse extends React.PureComponent {
    render() {
        return (
            <View style={styles.rRContainer}>
                <View style={styles.rRLeft}>
                    <View style={styles.rRLeftLeft}>
                        <TouchableOpacity style={styles.dismissButton}>
                            <Entypo
                                name="cross"
                                size={20}
                                color={palette.mediumGray}
                            />
                            <Text style={styles.dismissText}>Dismiss</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rRLeftRight}>
                        <TouchableOpacity style={styles.blockButton}>
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
                    <TouchableOpacity style={styles.respondButton}>
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
