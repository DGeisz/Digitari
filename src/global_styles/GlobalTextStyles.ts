import { StyleSheet } from "react-native";
import { palette } from "./Palette";

export const globalTextStyles = StyleSheet.create({
    userText: {
        color: palette.beneathTheWaves,
    },
    dotText: {
        color: palette.mediumGray,
        marginHorizontal: 2,
    },
    timeText: {
        color: palette.mediumOceanSurf,
    }
});