import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";

export const countdownCoinSize = 100;

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.grid2,
    },
    coinContainer: {
        position: "relative",
    },
    grayCoin: {
        height: countdownCoinSize,
        width: countdownCoinSize,
    },
    blueContainer: {
        position: "absolute",
        width: countdownCoinSize,
        bottom: 0,
        left: 0,
        overflow: "hidden",
    },
    blueCoin: {
        height: countdownCoinSize,
        width: countdownCoinSize,
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    remainingText: {
        fontWeight: "bold",
        color: palette.lightGray,
        fontSize: 17,
    },
    nextPostsButton: {
        ...basicLayouts.grid2,
        backgroundColor: palette.deepBlue,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    nextPostsText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.white,
        marginBottom: 10,
    },
    skipContainer: { marginTop: 10 },
    skipText: {
        fontSize: 15,
        color: palette.deepBlue,
        fontWeight: "500",
    },
    pulseContainer: {
        ...StyleSheet.absoluteFillObject,
        top: 24,
        left: 53,
    },
});
