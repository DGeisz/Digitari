import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";
import { globalTextStyles } from "../../global_styles/GlobalTextStyles";

export const styles = StyleSheet.create({
    postContainer: {
        paddingTop: 10,
        backgroundColor: palette.white,
    },
    postContentContainer: {
        flexDirection: "row",
    },
    pCCBottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
        paddingBottom: 5,
    },
    postSideBuffer: {
        paddingHorizontal: 2,
    },
    sideBufferTop: {
        ...basicLayouts.grid8,
    },
    sideBufferDivider: {
        width: 30,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
        marginVertical: 2,
    },
    sideBufferBottom: {
        ...basicLayouts.flexGrid2,
    },
    postMain: {
        ...basicLayouts.flexGrid1,
        marginLeft: 3,
        paddingRight: 10,
        paddingBottom: 5,
    },
    postHeader: {
        flexDirection: "row",
        ...basicLayouts.grid3,
    },
    postUserText: {
        ...globalTextStyles.userText,
        fontWeight: "700",
    },
    postDotText: {
        ...globalTextStyles.dotText,
    },
    postTimeText: {
        ...globalTextStyles.timeText,
    },
    postMainBody: {
        paddingTop: 10,
        paddingBottom: 25,
    },
    postMainText: {
        color: palette.hardGray,
        fontSize: 18,
    },
    postMainFooter: {
        flexDirection: "row",
    },
    mainFooterRight: {
        ...basicLayouts.flexGrid6,
    },
    mainFooterLeft: {
        ...basicLayouts.flexGrid7,
    },
    responseButton: {
        flexDirection: "row",
        backgroundColor: palette.oceanFroth,
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    costContainer: {
        flexDirection: "row",
        ...basicLayouts.grid2,
        borderRightWidth: 1,
        borderRightColor: palette.oceanSurf,
        marginRight: 2,
        paddingRight: 5,
    },
    pencil: {
        marginRight: 5,
    },
    postConvosContainer: {
        borderTopWidth: 1,
        borderTopColor: palette.softGray,
    },
    postExpandedFooter: {},
    exRightTop: {
        flexDirection: "row",
        ...basicLayouts.flexGrid4,
        marginBottom: 5,
    },
    rewardContainer: {
        backgroundColor: palette.lightForestGreen,
        ...basicLayouts.flexGrid5,
        paddingVertical: 4,
        borderRadius: 5,
    },
    convoRewardText: {
        color: palette.darkForestGreen,
        fontWeight: "600",
        marginRight: 5,
        fontSize: 15,
    },
    exRightBottom: {
        flexDirection: "row",
    },
    exResponseText: {
        fontSize: 17,
        fontWeight: "600",
        color: palette.beneathTheWaves,
        marginRight: 2,
    },
});
