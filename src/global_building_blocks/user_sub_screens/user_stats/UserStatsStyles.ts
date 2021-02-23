import { StyleSheet, Dimensions } from "react-native";
import { palette } from "../../../global_styles/Palette";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    statsContainer: {
        paddingHorizontal: 10,
        paddingTop: 20,
        width,
    },
    statsLeft: {
        paddingRight: 10,
        marginRight: 10,
        borderRightColor: palette.softGray,
        borderRightWidth: 1,
    },
    statsRight: {},
});
