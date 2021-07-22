import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../global_constants/screen_constants";

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.flexGrid2,
        backgroundColor: palette.white,
        width: GENERAL_CONTENT_WIDTH - 40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
    },
    childrenContainer: {
        ...basicLayouts.grid5,
        marginTop: 25,
        marginBottom: 10,
    },
    unknownText: {
        fontWeight: "bold",
        color: palette.hardGray,
        fontSize: 35,
    },
    unknownContainer: {
        ...basicLayouts.grid5,
        marginTop: 20,
    },
    itemViewInstructions: {
        fontWeight: "bold",
        color: palette.lightGray,
        marginBottom: 5,
    },
    title: {
        fontWeight: "bold",
        color: palette.deepBlue,
        fontSize: 17,
    },
});
