import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";
import { globalTextStyles } from "../../global_styles/GlobalTextStyles";
import {
    GENERAL_CONTENT_WIDTH,
    SCREEN_LARGER_THAN_CONTENT,
} from "../../global_constants/screen_constants";

const imageSize = GENERAL_CONTENT_WIDTH * 0.7;

export const styles = StyleSheet.create({
    postContainer: {
        width: GENERAL_CONTENT_WIDTH,
        borderRadius: SCREEN_LARGER_THAN_CONTENT ? 5 : 0,
        paddingTop: 10,
        backgroundColor: palette.white,
        alignSelf: "center",
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
        minWidth: 50,
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
    animatedContainer: {
        position: "absolute",
        overflow: "visible",
        left: 5,
        zIndex: 100,
    },
    pulseContainer: {
        position: "absolute",
        top: 2,
        left: 5,
    },
    coinText: {
        color: palette.mediumGray,
        fontWeight: "bold",
        fontSize: 13,
        transform: [{ translateY: -5 }],
    },
    postMain: {
        ...basicLayouts.flexGrid1,
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    errorText: {
        fontWeight: "bold",
        color: palette.danger,
        marginBottom: 5,
    },
    postHeader: {
        flexDirection: "row",
        // ...basicLayouts.grid3,
    },
    postHeaderLeft: {
        ...basicLayouts.flexGrid1,
    },
    postHeaderTop: {
        flexDirection: "row",
        ...basicLayouts.grid3,
    },
    postHeaderBottom: {
        flexDirection: "row",
        ...basicLayouts.grid3,
    },
    postUserText: {
        color: palette.hardGray,
        fontWeight: "600",
    },
    postDotText: {
        ...globalTextStyles.dotText,
    },
    postTimeText: {
        ...globalTextStyles.timeText,
    },
    targetIcon: {
        marginRight: 2,
    },
    followersTargetText: {
        fontWeight: "bold",
        color: palette.semiSoftGray,
    },
    communityTargetButton: {
        ...basicLayouts.grid2,
        flexDirection: "row",
    },
    postHeaderRight: {},
    communityTargetText: {
        fontWeight: "bold",
        color: palette.deepBlue,
    },
    postMainBody: {
        paddingTop: 10,
    },
    postMainText: {
        color: palette.hardGray,
        fontSize: 18,
    },
    addOnTextContainer: {
        marginTop: 20,
    },
    addOnText: {
        color: palette.mediumGray,
    },
    addOnImageContainer: {
        // ...basicLayouts.grid2,
        marginTop: 20,
    },
    addOnImage: {
        width: imageSize,
        height: imageSize,
        borderRadius: 10,
        backgroundColor: palette.softGray,
    },
    postMainFooter: {
        marginTop: 20,
        flexDirection: "row",
    },
    mainFooterLeft: {
        ...basicLayouts.flexGrid7,
        paddingBottom: 4,
    },
    mainFooterCenter: {
        ...basicLayouts.flexGrid7,
        paddingBottom: 4,
    },
    infoIconContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
    },
    infoIconText: {
        // fontWeight: "600",
        color: palette.lightGray,
        marginLeft: 2,
    },
    mainFooterRight: {},
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
    responsePulseContainer: {
        position: "absolute",
        top: -2,
        left: -1,
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

    footerBuffer: {
        height: 20,
    },
});
