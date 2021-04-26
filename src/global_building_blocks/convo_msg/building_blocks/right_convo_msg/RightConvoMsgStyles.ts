import { StyleSheet, Dimensions } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";
import { globalTextStyles } from "../../../../global_styles/GlobalTextStyles";

const { width } = Dimensions.get("window");
const msgBorderRadius = 20;

export const styles = StyleSheet.create({
    rightMsgContainer: {
        flexDirection: "row",
        width: width,
        marginTop: 10,
    },
    rightMsgBuffer: {
        ...basicLayouts.flexGrid1,
    },
    rightMsgMain: {
        maxWidth: 280,
        paddingRight: 5,
    },
    msgBodyContainer: {
        ...basicLayouts.grid6,
    },
    rightMsgBody: {
        backgroundColor: palette.deepBlue,
        padding: 12,
        borderTopLeftRadius: msgBorderRadius,
        borderTopRightRadius: msgBorderRadius,
        borderBottomLeftRadius: msgBorderRadius,
    },
    msgBodyText: {
        fontSize: 16,
        color: palette.white,
    },
    rightMsgFooter: {
        flexDirection: "row",
        ...basicLayouts.grid9,
        minWidth: 100,
    },
    msgFooterLeft: {
        ...basicLayouts.flexGrid9,
    },
    msgUserText: {
        color: palette.lightGray,
        fontSize: 13,
    },
    msgFooterRight: {
        flexDirection: "row",
        ...basicLayouts.grid3,
    },
    msgDotText: {
        ...globalTextStyles.dotText,
        color: palette.lightGray,
        fontSize: 13,
    },
    msgTimeText: {
        color: palette.lightGray,
        fontSize: 13,
    },
});
