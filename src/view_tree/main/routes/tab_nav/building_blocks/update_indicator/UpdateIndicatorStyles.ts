import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    indicatorDot: {
        left: 3,
        top: 4,
        position: "absolute",
        backgroundColor: palette.deepBlue,
        borderRadius: 50,
        height: 20,
        width: 20,
    },
});
