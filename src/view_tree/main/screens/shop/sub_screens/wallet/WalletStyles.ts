import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    bonusOuterContainer: {
        ...basicLayouts.grid2,
    },
    bonusInnerContainer: {
        ...basicLayouts.grid2,
        marginTop: 20,
        backgroundColor: palette.goldFlake,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    bonusTitle: {
        color: palette.darkGold,
        fontWeight: "bold",
        marginBottom: 5,
    },
    bonusTimeRemaining: {
        color: palette.darkGold,
        fontWeight: "bold",
        fontSize: 20,
    },
});
