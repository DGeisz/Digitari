import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    passwordContainer: {
        ...basicLayouts.flexGrid1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    errorText: {
        fontWeight: "bold",
        color: palette.danger,
        textAlign: "center",
    },
    footer: {
        ...basicLayouts.grid2,
    },
});
