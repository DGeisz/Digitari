import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";

const DOT_LENGTH = 11;

export const styles = StyleSheet.create({
    tabTitleText: {
        fontWeight: "600",
        fontSize: 15,
    },
    tabContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
    },
    dot: {
        height: DOT_LENGTH,
        width: DOT_LENGTH,
        backgroundColor: palette.deepBlue,
        borderRadius: DOT_LENGTH,
        marginRight: 5,
    },
});
