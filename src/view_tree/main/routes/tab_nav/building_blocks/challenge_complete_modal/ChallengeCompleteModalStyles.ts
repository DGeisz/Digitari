import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid4,
    },
    modalContainer: {
        backgroundColor: palette.white,
        padding: 20,
        borderRadius: 30,
    },
    modalHeader: {
        ...basicLayouts.grid2,
    },
    modalHeaderText: {
        fontWeight: "bold",
        fontSize: 23,
        color: palette.deepBlue,
    },
    modalBodyText: {
        marginVertical: 30,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
        color: palette.hardGray,
    },
    modalFooter: {
        ...basicLayouts.grid2,
    },
    modalCollectButton: {
        backgroundColor: palette.deepBlue,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    modalCollectButtonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: palette.white,
    },
});
