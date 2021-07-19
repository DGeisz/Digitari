import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const iconSideLength = 60;

export const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: palette.white,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    headerHeader: {
        ...basicLayouts.flexGrid2,
        flexDirection: "row",
        marginBottom: 10,
    },
    followErrorText: {
        color: palette.danger,
        paddingBottom: 10,
        fontWeight: "bold",
    },
    headerLeft: {
        ...basicLayouts.flexGrid2,
        flexDirection: "row",
    },
    iconContainer: {
        ...basicLayouts.grid5,
        height: iconSideLength,
        width: iconSideLength,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: palette.deepBlue,
        marginRight: 3,
    },
    headerRight: {
        ...basicLayouts.grid5,
    },
    followButton: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: palette.deepBlue,
        borderRadius: 20,
    },
    followButtonTextContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.softGray,
        paddingRight: 10,
    },
    followButtonText: {
        color: palette.hardGray,
        fontSize: 15,
        fontWeight: "bold",
        paddingVertical: 5,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.hardGray,
    },
    headerBody: {
        marginTop: 15,
        marginBottom: 20,
    },
    descriptionText: {
        color: palette.hardGray,
        fontSize: 18,
    },
    headerFooter: {
        flexDirection: "row",
    },
    footerLeft: {
        ...basicLayouts.flexGrid4,
    },
    followsText: {
        color: palette.hardGray,
        fontWeight: "normal",
    },
    followsCountText: {
        fontWeight: "bold",
    },
    footerRight: {
        ...basicLayouts.flexGrid6,
    },
    dateText: {
        fontWeight: "500",
        color: palette.lightGray,
    },
});
