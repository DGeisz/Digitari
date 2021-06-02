import { StyleSheet } from "react-native";
import { basicLayouts } from "./BasicLayouts";
import { palette } from "./Palette";

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
    footerContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
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
});
