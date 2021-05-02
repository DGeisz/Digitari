import { StyleSheet } from "react-native";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    iconContainer: {
        position: "relative",
    },
    newUpdateDot: {
        position: "absolute",
        right: -5,
        top: -5,
        height: 15,
        width: 15,
        backgroundColor: palette.deepBlue,
        borderRadius: 20,
    },
});
