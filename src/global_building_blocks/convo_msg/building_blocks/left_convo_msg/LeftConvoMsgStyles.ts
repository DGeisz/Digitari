import { StyleSheet } from "react-native";
import { palette } from "../../../../global_styles/Palette";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { globalTextStyles } from "../../../../global_styles/GlobalTextStyles";
import { GENERAL_CONTENT_WIDTH } from "../../../../global_constants/screen_constants";

const msgBorderRadius = 20;


export const styles = StyleSheet.create({
    leftMsgContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    leftMsgMain: {
        maxWidth: (4 * GENERAL_CONTENT_WIDTH) / 5,
        paddingLeft: 5,
    },
    msgBodyContainer: {
        ...basicLayouts.grid4,
    },
    leftMainBody: {
        backgroundColor: palette.softGray,
        padding: 12,
        borderTopLeftRadius: msgBorderRadius,
        borderTopRightRadius: msgBorderRadius,
        borderBottomRightRadius: msgBorderRadius,
    },
    leftMainText: {
        fontSize: 16,
        color: palette.hardGray,
    },
    leftMainFooter: {
        flexDirection: "row",
        ...basicLayouts.grid3,
        minWidth: 100,
    },
    mainFooterContainer: {
        flexDirection: "row",
        ...basicLayouts.grid3,
        ...basicLayouts.flexGrid1,
    },
    leftFooterLeft: {
        flexDirection: "row",
        ...basicLayouts.grid3,
    },
    msgUserText: {
        fontSize: 13,
        color: palette.lightGray,
    },
    msgDotText: {
        ...globalTextStyles.dotText,
        color: palette.lightGray,
        fontSize: 13,
    },
    leftFooterRight: {
        flexDirection: "row",
        ...basicLayouts.grid3,
    },
    leftTimeText: {
        color: palette.lightGray,
        fontSize: 13,
    },
    msgBlockContainer: {
        paddingLeft: 5,
    },
    msgBlockButton: {
        ...basicLayouts.grid5,
        backgroundColor: palette.warningLight,
        padding: 8,
        borderRadius: 8,
    },
});
