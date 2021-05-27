import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";
import { globalTextStyles } from "../../global_styles/GlobalTextStyles";
import { GENERAL_CONTENT_WIDTH } from "../../global_constants/screen_constants";

const buttonSize = 10;

export const styles = StyleSheet.create({
    coverContainer: {
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
        backgroundColor: palette.white,
    },
    coverBodyContainer: {
        flexDirection: "row",
    },
    dotBuffer: {
        width: 40,
        ...basicLayouts.grid5,
    },
    dot: {
        height: buttonSize,
        width: buttonSize,
        borderRadius: buttonSize,
        backgroundColor: palette.deepBlue,
    },
    sideBuffer: {
        width: 20,
    },
    main: {
        ...basicLayouts.flexGrid1,
    },
    mainHeader: {
        flexDirection: "row",
        marginTop: 5,
    },
    mainHeaderLeft: {
        flexDirection: "row",
        ...basicLayouts.flexGrid2,
    },
    mainHeaderTextContainer: {
        ...basicLayouts.flexGrid3,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    headerTop: {
        ...basicLayouts.flexGrid3,
        flexDirection: "row",
    },
    headerBottom: {
        ...basicLayouts.flexGrid3,
        flexDirection: "row",
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
    mainHeaderRight: {
        ...basicLayouts.grid6,
        marginRight: 3,
    },
    mainBody: {
        paddingTop: 12,
        paddingBottom: 15,
        marginRight: 20,
    },
    mainBodyText: {
        color: palette.lightGray,
    },
    bottomBorder: {
        height: 0,
        borderBottomWidth: 1,
        borderColor: palette.softGray,
        marginLeft: 20,
    },
});
