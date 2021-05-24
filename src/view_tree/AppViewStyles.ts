import { StyleSheet } from "react-native";
import { basicLayouts } from "../global_styles/BasicLayouts";
import { palette } from "../global_styles/Palette";

export const styles = StyleSheet.create({
    setupContainer: {
        ...basicLayouts.flexGrid5,
        padding: 20,
    },
    setupText: {
        fontWeight: "bold",
        fontSize: 18,
        color: palette.lightGray,
        textAlign: "center",
        marginBottom: 20,
    },
});
