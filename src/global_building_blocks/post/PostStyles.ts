import { StyleSheet } from "react-native";
import { palette } from "../../global_styles/Palette";
import { basicLayouts } from "../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: palette.white, //palette.white
        padding: 10,
    },
    postHeader: {
        padding: 10,
        ...basicLayouts.flexRow,
    },
    tierContainer: {
        backgroundColor: palette.oceanSurf,
        borderRadius: 5,
    },
    postUserText: {
        fontWeight: "500",
    },
    postTimeText: {
        color: palette.lightGray,
        fontWeight: "500",
    },
    postBodyContainer: {
        padding: 20,
    },
    postBodyText: {
        fontWeight: "600",
        fontSize: 21,
        color: palette.hardGray,
        marginTop: 8,
        marginBottom: 10,
    },
    postCoinText: {
        fontWeight: "500",
        color: palette.mediumOceanSurf,
    },
    postResponseButton: {
        backgroundColor: palette.softGray,
        borderRadius: 5,
        paddingHorizontal: 2,
        paddingVertical: 1,
    },
    postRewardContainer: {
        backgroundColor: palette.lightForestGreen,
        borderRadius: 5,
        padding: 10,
        ...basicLayouts.flexRow,
        ...basicLayouts.grid2,
    },
    postRewardText: {
        fontWeight: "500",
        color: palette.darkForestGreen,
    },
    postCostContainer: {
        backgroundColor: palette.lightGray,
        borderRadius: 5,
    },
    postCostText: {
        fontWeight: "500",
        color: palette.white,
    },
});
