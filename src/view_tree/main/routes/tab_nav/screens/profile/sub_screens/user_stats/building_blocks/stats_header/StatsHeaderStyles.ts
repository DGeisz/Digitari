import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../../../../global_styles/Palette";

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
    statsTitleText: {
        fontWeight: "500",
        color: palette.hardGray,
    },
    leftSplit1: {
        flexDirection: "row",
        ...basicLayouts.grid2,
        marginBottom: 5,
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
        marginTop: 10,
        flexDirection: "row",
    },
    split3Left: {
        ...basicLayouts.flexGrid1,
    },
    statsLevelText: {
        fontWeight: "700",
        color: palette.hardGray,
    },
    split3Right: {},
    statsProgressText: {
        fontWeight: "500",
        color: palette.hardGray,
    },
    leftSplit4: {
        height: 20,
        marginTop: 2,
    },
    statsProgressBar: {
        ...basicLayouts.flexGrid1,
        borderWidth: 2,
        borderColor: palette.hardGray,
        borderRadius: 10,
        overflow: "hidden",
    },
    statsProgressFill: {
        backgroundColor: palette.oceanSurf,
        height: 30,
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
