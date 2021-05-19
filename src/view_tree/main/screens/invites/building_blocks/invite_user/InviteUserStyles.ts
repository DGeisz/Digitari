import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.grid2,
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
});
