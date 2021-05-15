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
    convoTop: {
        flexDirection: "row",
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
    },
    convoUserMapContainer: {
        ...basicLayouts.flexGrid3,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 10,
    },
    convoOptionsContainer: {
        paddingTop: 5,
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
    noResponseContainer: {
        ...basicLayouts.grid5,
        marginTop: 40,
    },
    noResponseText: {
        fontWeight: "bold",
        fontSize: 18,
        color: palette.semiSoftGray,
    },
    noConvoContainer: {
        ...basicLayouts.grid2,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    noConvoText: {
        fontWeight: "bold",
        fontSize: 20,
        color: palette.lightGray,
    },
});
