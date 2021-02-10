import { StyleSheet } from "react-native";
import { palette } from "../../../../../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    statContainer: {
        marginBottom: 20,
    },
    statTitle: {
        fontWeight: "bold",
        color: palette.hardGray,
    },
    statContent: {
        paddingTop: 2,
        paddingHorizontal: 5,
        fontWeight: "600",
        color: palette.hardGray,
        fontSize: 18,
    },
});
