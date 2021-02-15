import { StyleSheet } from "react-native";
import { palette } from "../../../global_styles/Palette";

export const authStyles = StyleSheet.create({
    paddedAuthContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        paddingHorizontal: 30,
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
});
