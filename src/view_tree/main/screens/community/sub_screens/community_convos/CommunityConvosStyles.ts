import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    noConvosContainer: {
        ...basicLayouts.flexGrid5,
        paddingTop: 30,
        paddingHorizontal: 30,
    },
    noConvosText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
        textAlign: "center",
    },
});
