import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";

export const styles = StyleSheet.create({
    errorStateContainer: {
        ...basicLayouts.flexGrid2,
        margin: 20,
    },
    errorFailText: {
        color: palette.hardGray,
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
        marginTop: 5,
    },
    errorRefreshText: {
        color: palette.linkBlue,
        fontSize: 16,
        fontWeight: "600",
    },
});
