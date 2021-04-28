import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../global_styles/BasicLayouts";
import { palette } from "../../../global_styles/Palette";

export const styles = StyleSheet.create({
    noUserConvos: {
        marginTop: 40,
        ...basicLayouts.grid5,
    },
    noUserConvosText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
    },
});
