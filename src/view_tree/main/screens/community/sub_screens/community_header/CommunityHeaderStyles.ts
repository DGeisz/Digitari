import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: palette.white,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
    headerHeader: {
        ...basicLayouts.flexGrid2,
        flexDirection: "row",
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5,
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
