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
import {
    ReportConvoNavProp,
    ReportConvoRouteProp,
} from "../../../MainEntryNavTypes";
import { useMutation } from "@apollo/client";
import {
    REPORT_CONVO,
    ReportConvoData,
    ReportConvoVariables,
} from "./gql/Queries";

interface Props {
    navigation: ReportConvoNavProp;
    route: ReportConvoRouteProp;
}

const ReportConvo: React.FC<Props> = (props) => {
    const [report, setReport] = useState<string>("");
    const { cvid } = props.route.params;

    const [reportConvoMutation] = useMutation<
        ReportConvoData,
        ReportConvoVariables
    >(REPORT_CONVO, {
        variables: {
            cvid,
            report,
        },
        optimisticResponse: {
            reportConvo: report,
        },
    });

    const reportConvo = () => {
        if (!!report) {
            props.navigation.goBack();
            reportConvoMutation().then();
        }
    };

    return (
        <TouchableOpacity
            style={styles.reportContainer}
            onPress={Keyboard.dismiss}
            activeOpacity={1}
        >
            <Text style={styles.reportTitle}>
                Please explain why you're reporting this convo.
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
                    onPress={reportConvo}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ReportConvo;
