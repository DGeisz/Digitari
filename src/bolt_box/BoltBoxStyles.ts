import { StyleSheet } from "react-native";
import { basicLayouts } from "../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    boltBoxContainer: {
        flexDirection: "row",
        ...basicLayouts.grid2,
        paddingHorizontal: 3,
        paddingVertical: 2,
        borderRadius: 5,
    },
    boltBoxText: {
        fontWeight: "600",
    },
    boltIcon: {},
});
