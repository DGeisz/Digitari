import { StyleSheet } from "react-native";
import { GENERAL_CONTENT_WIDTH } from "../../../../global_constants/screen_constants";
import { palette } from "../../../../global_styles/Palette";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    outerContainer: {
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
        padding: 10,
    },
    levelTitle: {
        fontSize: 25,
        fontWeight: "bold",
        color: palette.deepBlue,
    },
    bubbleContainer: {
        backgroundColor: palette.white,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    titleContainer: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginBottom: 10,
    },
    bubbleTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: palette.hardGray,
        marginBottom: 20,
    },
    rewardsContainer: {
        ...basicLayouts.grid2,
        marginBottom: 10,
    },
});
