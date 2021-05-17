import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.flexGrid1,
        padding: 20,
    },
    header: {
        ...basicLayouts.grid2,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 16,
        color: palette.danger,
        fontWeight: "bold",
    },
    footer: {
        ...basicLayouts.grid2,
    },
});
