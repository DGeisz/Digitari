import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const buttonMarginHorizontal = 2;

export const styles = StyleSheet.create({
    rRContainer: {
        flexDirection: "row",
        height: 60,
        marginBottom: 5,
    },
    rRLeft: {
        flexDirection: "row",
        ...basicLayouts.flexGrid1,
    },
    rRLeftLeft: {
        ...basicLayouts.flexGrid1,
    },
    dismissButton: {
        ...basicLayouts.flexGrid5,
        backgroundColor: palette.softGray,
        marginHorizontal: buttonMarginHorizontal,
        borderRadius: 10,
    },
    dismissText: {
        fontSize: 16,
        fontWeight: "600",
        color: palette.mediumGray,
    },
    rRLeftRight: {
        ...basicLayouts.flexGrid1,
    },
    blockButton: {
        ...basicLayouts.flexGrid5,
        backgroundColor: palette.warningLight,
        marginHorizontal: buttonMarginHorizontal,
        borderRadius: 10,
    },
    blockText: {
        fontSize: 16,
        fontWeight: "600",
        color: palette.warning,
    },
    rRRight: {
        ...basicLayouts.flexGrid1,
    },
    respondButton: {
        ...basicLayouts.flexGrid5,
        backgroundColor: palette.oceanSurf,
        marginHorizontal: buttonMarginHorizontal,
        borderRadius: 10,
    },
    respondText: {
        fontSize: 16,
        fontWeight: "600",
        color: palette.deepBlue,
    },
});
