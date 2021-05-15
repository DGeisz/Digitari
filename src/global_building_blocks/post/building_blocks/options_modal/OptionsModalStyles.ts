import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    iconContainer: {
        paddingLeft: 20,
        paddingBottom: 20,
    },
    modalOuterContainer: {
        ...basicLayouts.flexGrid4,
    },
    modalContainer: {
        padding: 20,
        borderRadius: 30,
        backgroundColor: palette.white,
    },
    modalHeader: {
        ...basicLayouts.grid2,
        paddingBottom: 10,
    },
    modalHeaderText: {
        fontWeight: "bold",
        color: palette.hardGray,
        fontSize: 23,
    },
    modalErrorText: {
        textAlign: "center",
        color: palette.danger,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalInfoText: {
        textAlign: "center",
        color: palette.hardGray,
        marginBottom: 10,
    },
    optionsContainer: {
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
    },
    optionContainer: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingLeft: 3,
    },
    blockText: {
        fontSize: 18,
        color: palette.warning,
        fontWeight: "bold",
        marginLeft: 5,
    },
    reportText: {
        fontSize: 18,
        color: palette.danger,
        fontWeight: "bold",
    },
    deleteText: {
        fontSize: 18,
        color: palette.danger,
        fontWeight: "bold",
    },
    modalFooter: {
        ...basicLayouts.grid5,
        paddingTop: 10,
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
    blockButton: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 15,
        borderWidth: 2,
        borderColor: palette.deepBlue,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
    },
    blockButtonTextContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.semiSoftGray,
        paddingRight: 5,
    },
    blockButtonText: {
        fontSize: 15,
        color: palette.hardGray,
        fontWeight: "bold",
    },
});
