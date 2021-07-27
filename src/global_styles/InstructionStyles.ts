import { StyleSheet } from "react-native";
import { basicLayouts } from "./BasicLayouts";
import { palette } from "./Palette";
import { GENERAL_CONTENT_WIDTH } from "../global_constants/screen_constants";

export const instructionStyles = StyleSheet.create({
    modal: {
        paddingHorizontal: 0,
        margin: 0,
    },
    modalTop: {
        ...basicLayouts.flexGrid1,
    },
    modalBottom: {
        ...basicLayouts.flexGrid7,
    },
    instructionContainer: {
        backgroundColor: "black",
        opacity: 0.9,
        padding: 20,
    },
    innerContainer: {
        width: GENERAL_CONTENT_WIDTH - 40,
        alignSelf: "center",
    },
    header: {
        flexDirection: "row",
        marginBottom: 5,
    },
    headerLeft: {
        ...basicLayouts.flexGrid1,
    },
    headerRight: {
        ...basicLayouts.flexGrid3,
    },
    headerText: {
        color: palette.soapStone,
    },
    instructionText: {
        color: palette.white,
        fontSize: 17,
        fontWeight: "bold",
    },
    italics: {
        fontStyle: "italic",
    },
    footerContainer: {
        ...basicLayouts.grid5,
        marginTop: 20,
    },
    footerText: {
        color: palette.lightGray,
    },
    footerLeft: {
        ...basicLayouts.flexGrid1,
    },
    footerRight: {
        ...basicLayouts.flexGrid3,
    },
    button: {
        backgroundColor: palette.deepBlue,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    buttonText: {
        color: palette.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    centralContentContainer: {
        ...basicLayouts.grid2,
        marginVertical: 10,
    },
    skipContainer: {
        ...basicLayouts.grid2,
        marginTop: 20,
    },
    skipText: {
        color: palette.white,
        textAlign: "center",
        fontSize: 15,
    },
    skipFooter: {
        flexDirection: "row",
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: palette.lightGray,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    cancelButtonText: {
        color: palette.hardGray,
        fontSize: 20,
        fontWeight: "bold",
    },
    skipButton: {
        backgroundColor: palette.warningLight,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        marginLeft: 5,
    },
    skipButtonText: {
        color: palette.warning,
        fontSize: 20,
        fontWeight: "bold",
    },
    contentContainer: {
        ...basicLayouts.grid2,
        marginTop: 10,
    },
});
