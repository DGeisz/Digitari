import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    walletContainer: {
        flexDirection: "row",
        backgroundColor: palette.white,
        padding: 10,
        // borderBottomWidth: 2,
        // borderColor: palette.hardGray,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    walletLeft: {},
    walletLeftTop: {
        flexDirection: "row",
        ...basicLayouts.grid2,
        marginBottom: 10,
    },
    walletSumText: {
        color: palette.hardGray,
        fontWeight: "500",
        fontSize: 20,
        marginRight: 5,
    },
    walletLeftBottom: {
        flexDirection: "row",
    },
    walletCountDownText: {
        color: palette.hardGray,
        fontWeight: "700",
    },
    walletRight: {
        ...basicLayouts.flexGrid6,
    },
    walletCollectButton: {
        backgroundColor: palette.oceanSurf,
        padding: 10,
        borderRadius: 10,
    },
    collectButtonText: {
        color: palette.deepBlue,
        fontWeight: "600",
        fontSize: 18,
    },
});
