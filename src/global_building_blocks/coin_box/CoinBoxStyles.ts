import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    coinBoxContainer: {
        flexDirection: "row",
        ...basicLayouts.grid2,
        paddingHorizontal: 3,
        paddingVertical: 2,
        borderRadius: 5,
    },
    coinBoxText: {
        fontWeight: "600",
    },
    coinIcon: {},
});
