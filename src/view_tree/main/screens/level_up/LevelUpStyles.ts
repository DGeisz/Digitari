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
    bubbleContainer: {
        backgroundColor: palette.white,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    bubbleTitleContainer: {
        ...basicLayouts.grid2,
    },
    tasksTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: palette.hardGray,
    },
    rewardsTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: palette.deepBlue,
    },
});
