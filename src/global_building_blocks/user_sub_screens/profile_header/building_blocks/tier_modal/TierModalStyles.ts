import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../global_styles/Palette";
import { GENERAL_CONTENT_WIDTH } from "../../../../../global_constants/screen_constants";

export const styles = StyleSheet.create({
    modalOuterContainer: {
        ...basicLayouts.flexGrid4,
        paddingVertical: 40,
    },
    modalContainer: {
        width: GENERAL_CONTENT_WIDTH - 40,
        alignSelf: "center",
        marginVertical: 40,
        backgroundColor: palette.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    modalHeader: {
        ...basicLayouts.grid5,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    modalHeaderText: {
        fontWeight: "bold",
        fontSize: 23,
        color: palette.deepBlue,
    },
    explanationContainer: {
        marginVertical: 10,
    },
    explanationText: {
        fontSize: 15,
        color: palette.hardGray,
    },
    boldText: {
        fontWeight: "bold",
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
