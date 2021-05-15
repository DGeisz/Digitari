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
    REPORT_COMMUNITY,
    ReportCommunityData,
    ReportCommunityVariables,
} from "./gql/Mutations";
import {
    ReportCommunityNavProp,
    ReportCommunityRouteProp,
} from "../../../MainEntryNavTypes";

interface Props {
    navigation: ReportCommunityNavProp;
    route: ReportCommunityRouteProp;
}

const ReportCommunity: React.FC<Props> = (props) => {
    const [report, setReport] = useState<string>("");
    const { cmid } = props.route.params;

    const [reportCommunityMutation] = useMutation<
        ReportCommunityData,
        ReportCommunityVariables
    >(REPORT_COMMUNITY, {
        variables: {
            cmid,
            report,
        },
    });

    const reportCommunity = () => {
        if (!!report) {
            props.navigation.goBack();
            reportCommunityMutation().then();
        }
    };

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
                    onPress={reportCommunity}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ReportCommunity;
