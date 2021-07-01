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
    headerContainer: {
        ...basicLayouts.grid2,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: palette.deepBlue,
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
});
