import { StyleSheet } from "react-native";
import { palette } from "../../../../global_styles/Palette";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { DefaultTheme } from "@react-navigation/native";
import { GENERAL_CONTENT_WIDTH } from "../../../../global_constants/screen_constants";

export const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: palette.white,
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
    },
    headerContainer: {},
    postConvosBuffer: {
        backgroundColor: DefaultTheme.colors.background,
        height: 30,
    },
    convosContainer: {
        paddingTop: 10,
    },
    convosTitleText: {
        fontWeight: "bold",
        fontSize: 18,
        color: palette.deepBlue,
        marginLeft: 10,
        alignSelf: "center",
        marginBottom: 2,
    },
    orderOptionContainer: {
        backgroundColor: palette.white,
        paddingTop: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    orderByTitle: {
        fontWeight: "bold",
        fontSize: 12,
        color: palette.hardGray,
    },
    orderOptionBar: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    orderOption: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    orderOptionText: {
        fontWeight: "bold",
        color: palette.hardGray,
    },
    noConvos: {
        ...basicLayouts.flexGrid5,
        marginTop: 30,
    },
    noConvosText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
    },
    listFooterBuffer: {
        height: 100,
    },
});
