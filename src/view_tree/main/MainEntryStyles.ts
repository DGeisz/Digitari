import { StyleSheet } from "react-native";
import { palette } from "../../global_styles/Palette";
import { basicLayouts } from "../../global_styles/BasicLayouts";

const DOT_SIZE = 8;

export const styles = StyleSheet.create({
    inviteContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
        marginHorizontal: 10,
    },
    inviteDotContainer: {
        position: "relative",
        marginRight: 5,
    },
    inviteDot: {
        height: DOT_SIZE,
        width: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: palette.deepBlue,
    },
    pulseContainer: {
        position: "absolute",
        left: -9,
        top: -10,
    },
    inviteText: {
        fontWeight: "bold",
        color: palette.hardGray,
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
