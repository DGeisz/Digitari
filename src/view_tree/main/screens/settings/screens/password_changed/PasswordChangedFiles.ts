import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.flexGrid2,
        padding: 20,
    },
    successText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.deepBlue,
        textAlign: "center",
    },
});
