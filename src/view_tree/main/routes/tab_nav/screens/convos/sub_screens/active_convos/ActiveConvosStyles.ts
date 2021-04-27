import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    noActiveConvos: {
        ...basicLayouts.flexGrid5,
    },
    noActiveConvosText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
    },
    refreshText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: palette.deepBlue,
    },
});
