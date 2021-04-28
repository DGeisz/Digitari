import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    noPostsContainer: {
        ...basicLayouts.flexGrid5,
        paddingTop: 10,
        paddingHorizontal: 30,
    },
    noPostsText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
        textAlign: "center",
    },
});
