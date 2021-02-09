import { StyleSheet, Dimensions } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid5,
    },
    modalContainer: {
        padding: 10,
        backgroundColor: palette.white,
        borderRadius: 20,
    },
    modalHeader: {
        ...basicLayouts.grid5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: palette.softGray,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "600",
        color: palette.hardGray,
    },
    modalBody: {
        width: (2 * width) / 3,
        padding: 10,
    },
    bodyText: {
        fontSize: 16,
        color: palette.hardGray,
    },
    modalFooter: {
        flexDirection: "row",
        ...basicLayouts.grid5,
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: palette.softGray,
        padding: 12,
        borderRadius: 10,
    },
    cancelText: {
        fontSize: 18,
        fontWeight: "600",
        color: palette.mediumGray,
    },
    confirmButton: {
        padding: 12,
        borderRadius: 10,
        marginLeft: 5,
    },
    confirmText: {
        fontSize: 18,
        fontWeight: "600",
    },
});
