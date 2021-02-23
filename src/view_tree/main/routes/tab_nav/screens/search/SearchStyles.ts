import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: palette.soapStone,
    },
    searchInputContainer: {
        backgroundColor: palette.softGray,
        borderRadius: 30,
        paddingHorizontal: 8,
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
