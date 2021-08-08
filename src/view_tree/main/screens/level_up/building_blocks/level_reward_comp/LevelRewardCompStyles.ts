import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginBottom: 10,
    },
    rewardText: {
        fontWeight: "bold",
        fontSize: 19,
        color: palette.deepBlue,
    },
    iconButton: {
        width: 20,
        marginLeft: 10,
    },
    modalDescription: {
        color: palette.hardGray,
        fontSize: 15,
        marginBottom: 15,
    },
});
