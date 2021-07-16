import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { GENERAL_CONTENT_WIDTH } from "../../../../../global_constants/screen_constants";
import { palette } from "../../../../../global_styles/Palette";

export const shopStyles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid1,
    },
    container: {
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
        padding: 20,
    },
    basicEntryContainer: {
        marginBottom: 30,
    },
    entryTitleText: {
        fontWeight: "bold",
        color: palette.deepBlue,
        fontSize: 16,
    },
    entryDescription: {
        marginTop: 20,
        alignSelf: "center",
        textAlign: "center",
        fontSize: 15,
        color: palette.hardGray,
    },
    entrySeparator: {
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
        marginBottom: 20,
    },
    entryBigDescription: {
        fontSize: 17,
        fontWeight: "bold",
    },
    boldBlue: {
        fontWeight: "bold",
        color: palette.deepBlue,
    },
    headerContainer: {
        ...basicLayouts.grid2,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: palette.deepBlue,
        marginBottom: 5,
    },
    descriptionContainer: {
        ...basicLayouts.flexGrid1,
        maxWidth: 300,
    },
    shopDescription: {
        color: palette.hardGray,
        textAlign: "center",
        fontWeight: "500",
    },
    shopItalics: {
        fontStyle: "italic",
    },
});
