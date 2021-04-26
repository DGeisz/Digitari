import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    noFeedContainer: {
        ...basicLayouts.flexGrid5,
        paddingHorizontal: 30,
    },
    noFeedText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
        textAlign: "center",
    },
});
