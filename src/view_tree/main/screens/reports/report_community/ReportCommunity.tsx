import React, { useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "../ReportStyles";
import { palette } from "../../../../../global_styles/Palette";

const ReportCommunity: React.FC = () => {
    const [report, setReport] = useState<string>("");

    return (
        <TouchableOpacity
            style={styles.reportContainer}
            onPress={Keyboard.dismiss}
            activeOpacity={1}
        >
            <Text style={styles.reportTitle}>
                Please explain why you're reporting this community.
            </Text>
            <TextInput
                style={styles.reportInput}
                multiline
                keyboardType="twitter"
                placeholder={"Report..."}
                onChangeText={(text) =>
                    setReport(text.replace(/\r?\n|\r/g, "").substring(0, 500))
                }
                value={report}
            />
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        !!report
                            ? {}
                            : { backgroundColor: palette.notDeepBlue },
                    ]}
                    activeOpacity={!!report ? 0.5 : 1}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ReportCommunity;
