import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    noCommunityContainer: {
        ...basicLayouts.grid5,
        marginTop: 20,
        marginHorizontal: 10,
    },
    noCommunityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
    },
});
