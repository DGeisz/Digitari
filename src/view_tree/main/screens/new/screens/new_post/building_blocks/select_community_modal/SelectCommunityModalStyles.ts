import { StyleSheet } from "react-native";
import { palette } from "../../../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    selectContainer: {
        ...basicLayouts.flexGrid1,
        backgroundColor: palette.white,
        borderRadius: 20,
        padding: 20,
    },
    preHeader: {
        ...basicLayouts.grid3,
    },
    closeButton: {},
    selectHeader: {
        ...basicLayouts.grid2,
    },
    selectTitleText: {
        fontWeight: "bold",
        fontSize: 20,
        color: palette.hardGray,
    },
    searchContainer: {
        backgroundColor: palette.white,
        borderBottomColor: palette.transparent,
        borderTopColor: palette.transparent,
    },
    searchInputContainer: {
        backgroundColor: palette.softGray,
        borderRadius: 30,
        paddingHorizontal: 7,
    },
    resultsContainer: {
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingBottom: 2,
    },
    resultsTitleText: {
        fontWeight: "bold",
        fontSize: 16,
        color: palette.deepBlue,
        marginTop: 10,
    },
    noResultsContainer: {
        ...basicLayouts.flexGrid5,
    },
    noResultsText: {
        fontWeight: "bold",
        fontSize: 18,
        color: palette.lightGray,
    },
});
