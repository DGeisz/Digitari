import { StyleSheet } from "react-native";
import { basicLayouts } from "../global_styles/BasicLayouts";
import { palette } from "../global_styles/Palette";
import { GENERAL_CONTENT_WIDTH } from "../global_constants/screen_constants";

const imgWidth = GENERAL_CONTENT_WIDTH - 100;
const imgHeight = 0.7 * imgWidth;

export const styles = StyleSheet.create({
    setupContainer: {
        ...basicLayouts.flexGrid5,
        padding: 20,
    },
    danceContainer: {
        height: imgHeight - 20,
        overflow: "hidden",
    },
    dance: {
        width: imgWidth,
        height: imgHeight,
    },
    setupText: {
        fontWeight: "bold",
        fontSize: 18,
        color: palette.lightGray,
        textAlign: "center",
        marginBottom: 20,
    },
});
