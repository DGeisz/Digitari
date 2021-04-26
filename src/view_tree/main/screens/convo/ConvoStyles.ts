import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";
import { globalTextStyles } from "../../../../global_styles/GlobalTextStyles";

export const styles = StyleSheet.create({
    convoContainer: {
        ...basicLayouts.flexGrid1,
    },
    convoHeaderContainer: {
        backgroundColor: palette.white,
    },
    coverContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    convoUserMapContainer: {
        ...basicLayouts.grid3,
        flexDirection: "row",
        flexWrap: "wrap",
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
        paddingTop: 10,
    },
    arrowText: {
        color: palette.deepBlue,
    },
    mainHeaderDotText: {
        ...globalTextStyles.dotText,
    },
    coverTimeText: {
        ...globalTextStyles.timeText,
    },
    rewardContainer: {
        marginTop: 10,
    },
    rewardText: {
        color: palette.mediumGray,
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 3,
    },
    coinBoxContainer: {
        ...basicLayouts.grid4,
    },
    errorContainer: {
        marginTop: 20,
    },
    errorText: {
        fontWeight: "bold",
        color: palette.danger,
    },
});
