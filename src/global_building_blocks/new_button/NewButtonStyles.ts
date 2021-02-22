import { StyleSheet } from "react-native";
import { palette } from "../../global_styles/Palette";

export const styles = StyleSheet.create({
    viewContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    newButton: {
        position: "absolute",
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: palette.deepBlue,
        bottom: 15,
        right: 15,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
});
