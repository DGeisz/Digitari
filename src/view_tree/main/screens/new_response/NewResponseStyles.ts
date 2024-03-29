import { StyleSheet } from "react-native";
import { palette } from "../../../../global_styles/Palette";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    targetContainer: {
        flexDirection: "row",
        padding: 10,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
    },
    arrowText: {
        color: palette.deepBlue,
        fontSize: 17,
    },
    targetText: {
        color: palette.hardGray,
        fontWeight: "bold",
    },
    postAsChoiceContainer: {
        flexDirection: "row",
        padding: 10,
        ...basicLayouts.grid2,
    },
    postAsText: {
        color: palette.hardGray,
        fontWeight: "bold",
        fontSize: 17,
    },
    postAsChoice: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
});
