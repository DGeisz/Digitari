import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    indicatorDot: {
        right: -5,
        top: -5,
        position: "absolute",
        backgroundColor: palette.deepBlue,
        borderRadius: 50,
        height: 20,
        width: 20,
    },
});
