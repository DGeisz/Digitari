import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    boltContainer: {
        position: "absolute",
        ...basicLayouts.grid2,
        flexDirection: "row",
        left: -22,
    },
    bolt: {
        transform: [
            {
                translateX: -12,
            },
        ],
    },
});
