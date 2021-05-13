import { StyleSheet } from "react-native";
import { palette } from "../../global_styles/Palette";
import { basicLayouts } from "../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    challengeContainer: {
        backgroundColor: palette.white,
        paddingRight: 15,
        paddingBottom: 15,
        paddingTop: 10,
        flexDirection: "row",
        marginBottom: 15,
    },
    challengeSideCoin: {
        ...basicLayouts.grid5,
        paddingHorizontal: 10,
    },
    challengeMain: {
        ...basicLayouts.flexGrid1,
    },
    challengeMainTop: {
        flexDirection: "row",
        marginBottom: 10,
    },
    challengeTopLeft: {
        ...basicLayouts.flexGrid4,
        flexDirection: "row",
    },
    challengeTextContainer: {
        ...basicLayouts.flexGrid4,
    },
    challengeText: {
        color: palette.hardGray,
        fontSize: 16,
        fontWeight: "500",
    },
    infoButton: {
        marginRight: 10,
    },
    challengeTopRight: {
        borderLeftWidth: 1,
        borderColor: palette.softGray,
        paddingLeft: 10,
        marginLeft: 10,
    },
    rewardTitle: {
        fontWeight: "bold",
        fontSize: 12,
        color: palette.deepBlue,
    },
    challengeMainBottom: {
        ...basicLayouts.grid2,
        flexDirection: "row",
    },
    challengeBottomLeft: {
        ...basicLayouts.flexGrid1,
    },
    challengeProgressBar: {
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
    },
    challengeProgressFill: {
        height: 10,
    },
    challengeBottomRight: {
        marginLeft: 10,
    },
    challengeCompletionText: {
        color: palette.hardGray,
        fontWeight: "bold",
    },
});
