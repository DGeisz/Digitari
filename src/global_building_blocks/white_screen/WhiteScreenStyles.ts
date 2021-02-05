import { StyleSheet, Dimensions } from "react-native";
import { palette } from "../../global_styles/Palette";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    whiteScreen: {
        backgroundColor: palette.white,
        position: "absolute",
        height,
        width,
    },
});
