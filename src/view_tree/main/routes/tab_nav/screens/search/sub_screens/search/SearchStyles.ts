import { StyleSheet } from "react-native";
import { palette } from "../../../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: palette.white,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    searchContainer: {
        backgroundColor: palette.white,
        borderBottomColor: palette.transparent,
    },
    searchInputContainer: {
        backgroundColor: palette.softGray,
        borderRadius: 30,
        paddingHorizontal: 7,
    },
    searchUnderHeader: {},
    searchOptionsBar: {
        ...basicLayouts.flexRow,
        marginLeft: 10,
        marginBottom: 10,
    },
    searchOption: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },
    searchOptionText: {
        fontWeight: "bold",
    },
    resultsTitle: {
        marginVertical: 5,
        fontWeight: "bold",
        color: palette.deepBlue,
        marginLeft: 10,
    },
    noResultsContainer: {
        ...basicLayouts.flexGrid5,
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    noResultsText: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "600",
        color: palette.lightGray,
    },
});
