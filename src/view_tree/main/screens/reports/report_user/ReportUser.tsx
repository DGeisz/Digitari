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
import { useMutation } from "@apollo/client";
import {
    REPORT_USER,
    ReportUserData,
    ReportUserVariables,
} from "./gql/Mutations";
import {
    ReportUserNavProp,
    ReportUserRouteProp,
} from "../../../MainEntryNavTypes";

interface Props {
    navigation: ReportUserNavProp;
    route: ReportUserRouteProp;
}

const ReportUser: React.FC<Props> = (props) => {
    const [report, setReport] = useState<string>("");
    const { uid } = props.route.params;

    const [reportUserMutation] = useMutation<
        ReportUserData,
        ReportUserVariables
    >(REPORT_USER, {
        variables: {
            uid,
            report,
        },
        optimisticResponse: {
            reportUser: report,
        },
    });

    const reportUser = () => {
        if (!!report) {
            props.navigation.goBack();
            reportUserMutation().then();
        }
    };

    return (
        <TouchableOpacity
            style={styles.reportContainer}
            onPress={Keyboard.dismiss}
            activeOpacity={1}
        >
            <Text style={styles.reportTitle}>
                Please explain why you're reporting this user.
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
                    onPress={reportUser}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ReportUser;
