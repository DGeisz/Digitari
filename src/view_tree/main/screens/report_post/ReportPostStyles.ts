import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    reportContainer: {
        ...basicLayouts.flexGrid1,
        padding: 20,
    },
    reportTitle: {
        fontSize: 18,
        color: palette.hardGray,
        fontWeight: "bold",
    },
    reportInput: {
        fontSize: 16,
        marginTop: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: palette.semiSoftGray,
    },
    footer: {
        ...basicLayouts.grid5,
        marginTop: 20,
    },
    submitButton: {
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 40,
    },
    submitButtonText: {
        fontSize: 18,
        color: palette.white,
        fontWeight: "bold",
    },
});
