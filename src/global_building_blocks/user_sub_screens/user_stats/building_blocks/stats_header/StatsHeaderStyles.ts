import { StyleSheet } from "react-native";
import { palette } from "../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        backgroundColor: palette.white,
        padding: 10,
    },
    statsLeft: {
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: palette.softGray,
    },
    statsTitleContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
    },
    statsTitleText: {
        fontWeight: "500",
        color: palette.hardGray,
    },
    leftSplit1: {
        flexDirection: "row",
        ...basicLayouts.grid2,
        marginTop: 5,
        marginBottom: 10,
    },
    rankingContainer: {
        marginLeft: 3,
    },
    rankingTitle: {
        fontWeight: "bold",
        fontSize: 12,
        color: palette.deepBlue,
    },
    statsRankingText: {
        fontSize: 22,
        fontWeight: "500",
        color: palette.hardGray,
    },
    leftSplit2: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: palette.softGray,
        paddingBottom: 10,
    },
    leftSplit3: {
        ...basicLayouts.flexGrid1,
        marginTop: 10,
        flexDirection: "row",
    },
    split3Left: {
        // ...basicLayouts.flexGrid1,
        marginRight: 10,
    },
    statsLevelText: {
        fontWeight: "700",
        color: palette.hardGray,
    },
    split3Right: {
        // ...basicLayouts.flexGrid1,
    },
    statsProgressText: {
        fontWeight: "500",
        color: palette.hardGray,
    },
    leftSplit4: {
        height: 20,
        marginTop: 2,
    },
    statsProgressBar: {
        borderWidth: 1,
        borderColor: palette.deepBlue,
        borderRadius: 10,
        overflow: "hidden",
    },
    statsProgressFill: {
        backgroundColor: palette.deepBlue,
        height: 10,
    },
    statsRight: {
        ...basicLayouts.flexGrid1,
    },
    statsRightTop: {
        ...basicLayouts.grid4,
        marginBottom: 10,
    },
    statsWalletText: {
        fontWeight: "500",
        color: palette.hardGray,
        marginLeft: 10,
    },
    statsRightBottom: {
        borderTopWidth: 1,
        borderColor: palette.softGray,
        paddingTop: 10,
        marginLeft: 10,
    },
    followsCountText: {
        fontSize: 16,
        fontWeight: "700",
        color: palette.hardGray,
    },
    statsFollowsText: {
        fontWeight: "400",
        color: palette.hardGray,
    },
});
