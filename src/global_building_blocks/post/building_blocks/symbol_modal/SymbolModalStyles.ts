import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";
import { GENERAL_CONTENT_WIDTH } from "../../../../global_constants/screen_constants";

export const styles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid5,
    },
    modalContainer: {
        backgroundColor: palette.white,
        padding: 20,
        borderRadius: 30,
        width: GENERAL_CONTENT_WIDTH - 40,
    },
    modalHeader: {
        ...basicLayouts.grid2,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.deepBlue,
        marginBottom: 10,
    },

    symExpContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    symExpLeft: {
        width: 55,
    },
    symColonContainer: {
        ...basicLayouts.grid8,
        flexDirection: "row",
    },
    coinContainer: {
        transform: [{ translateX: 5 }],
    },
    colon: {
        fontWeight: "bold",
        color: palette.hardGray,
    },
    symExpRight: {
        ...basicLayouts.flexGrid1,
        marginLeft: 5,
    },
    symExpText: {
        color: palette.hardGray,
        fontSize: 16,
    },
    modalFooter: {
        ...basicLayouts.grid5,
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    closeButton: {
        backgroundColor: palette.softGray,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: palette.lightGray,
        fontWeight: "bold",
        fontSize: 18,
    },
});
