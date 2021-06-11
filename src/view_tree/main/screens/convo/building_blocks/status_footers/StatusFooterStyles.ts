import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    statusContainer: {
        ...basicLayouts.flexGrid5,
        marginVertical: 10,
    },
    dismissedContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: palette.softGray,
    },
    dismissedText: {
        fontSize: 17,
        fontWeight: "600",
        color: palette.mediumGray,
    },
    blockedContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: palette.warningLight,
    },
    blockedText: {
        fontSize: 17,
        fontWeight: "600",
        color: palette.warning,
    },
    successContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: palette.lightForestGreen,
    },
    successText: {
        fontSize: 17,
        fontWeight: "600",
        color: palette.darkForestGreen,
    },
    pendingContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: palette.primaryLight,
    },
    pendingText: {
        fontSize: 17,
        fontWeight: "600",
        color: palette.primary,
    },
    pulseOuterContainer: {},
    pulseInnerContainer: {
        position: "absolute",
        left: -13,
        top: 8,
    },
});
