import { StyleSheet } from "react-native";
import { palette } from "../../global_styles/Palette";
import { basicLayouts } from "../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    inviteText: {
        fontWeight: "bold",
        marginHorizontal: 10,
        color: palette.deepBlue,
    },
    coinContainer: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginHorizontal: 10,
    },
    coinText: {
        fontWeight: "bold",
        color: palette.deepBlue,
        fontSize: 18,
    },
    coin: {
        height: 25,
        width: 25,
        transform: [
            {
                translateY: 1,
            },
        ],
    },
});
