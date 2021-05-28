import { StyleSheet } from "react-native";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../global_constants/screen_constants";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    passwordContainer: {
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    errorText: {
        fontWeight: "bold",
        color: palette.danger,
        textAlign: "center",
    },
    footer: {
        ...basicLayouts.grid2,
    },
});
