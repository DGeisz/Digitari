import React, { useState } from "react";
import {
    ReportPostNavProp,
    ReportPostRouteProp,
} from "../../MainEntryNavTypes";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./ReportPostStyles";
import { palette } from "../../../../global_styles/Palette";
import { useMutation } from "@apollo/client";
import {
    REPORT_POST,
    ReportPostData,
    ReportPostVariables,
} from "./gql/Mutations";

interface Props {
    navigation: ReportPostNavProp;
    route: ReportPostRouteProp;
}

const ReportPost: React.FC<Props> = (props) => {
    const [report, setReport] = useState<string>("");
    const { pid } = props.route.params;

    const [reportPostMutation] = useMutation<
        ReportPostData,
        ReportPostVariables
    >(REPORT_POST, {
        variables: {
            pid,
            report,
        },
        optimisticResponse: {
            reportPost: report,
        },
    });

    const reportPost = () => {
        if (!!report) {
            props.navigation.goBack();
            reportPostMutation().then();
        }
    };

    return (
        <TouchableOpacity
            style={styles.reportContainer}
            onPress={Keyboard.dismiss}
            activeOpacity={1}
        >
            <Text style={styles.reportTitle}>
                Please explain why you're reporting this post.
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
                    onPress={reportPost}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ReportPost;
