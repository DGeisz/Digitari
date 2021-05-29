import { StyleSheet, Dimensions } from "react-native";
import { palette } from "../../../global_styles/Palette";

const { width } = Dimensions.get("window");
const minWidth = 600;

export const authStyles = StyleSheet.create({
    paddedAuthContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        alignSelf: "center",
        paddingHorizontal: 30,
        width: width > minWidth ? minWidth : width,
    },
    paddedInput: {
        marginTop: 100,
    },
    authInputFooter: {
        alignSelf: "flex-start",
    },
    authInputFooterText: {
        marginLeft: 10,
        fontWeight: "500",
        color: palette.hardGray,
    },
    authInstructions: {
        alignSelf: "flex-start",
        marginBottom: 20,
        color: palette.hardGray,
        fontSize: 18,
        fontWeight: "500",
    },
    authErrorText: {
        color: palette.danger,
        fontSize: 15,
    },
    subText: {
        fontWeight: "bold",
        color: palette.lightGray,
    },
    signUpConsent: {
        textAlign: "center",
        fontWeight: "500",
        color: palette.hardGray,
    },
    tcLink: {
        textDecorationLine: "underline",
        color: palette.deepBlue,
    },
});
