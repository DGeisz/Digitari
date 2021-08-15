import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.grid5,
        marginTop: 20,
    },
    confirmButton: {
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    confirmButtonText: {
        color: palette.white,
        fontWeight: "bold",
        fontSize: 18,
    },
    alreadySelectedText: {
        color: palette.lightGray,
        fontWeight: "bold",
        fontSize: 18,
    },
    lockedContainer: {
        ...basicLayouts.grid5,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: palette.semiSoftGray,
        borderRadius: 20,
    },
    lockedTitleContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.mediumGray,
        paddingRight: 6,
    },
    lockedTitle: {
        fontWeight: "bold",
        color: palette.mediumGray,
        fontSize: 16,
    },
    lockedPriceContainer: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginBottom: 5,
    },
    lockedPrice: {
        fontWeight: "500",
        fontSize: 16,
        color: palette.mediumGray,
        transform: [{ translateX: -4 }],
    },
    lockedLockContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.mediumGray,
        paddingRight: 4,
    },
    errorText: {
        fontWeight: "bold",
        color: palette.danger,
        marginBottom: 10,
        textAlign: "center",
    },
    confirmContainer: {
        ...basicLayouts.grid5,
    },
    confirmText: {
        color: palette.hardGray,
        maxWidth: 230,
        textAlign: "center",
        marginBottom: 10,
    },
    confirmBar: {
        ...basicLayouts.grid5,
        flexDirection: "row",
    },
    cancelButton: {
        ...basicLayouts.grid5,
        backgroundColor: palette.semiSoftGray,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        marginRight: 5,
    },
    cancelButtonText: {
        color: palette.mediumGray,
        fontWeight: "bold",
        fontSize: 18,
    },
    buyButton: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: palette.deepBlue,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 14,
    },
    buyButtonTextContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.lightGray,
        paddingRight: 10,
    },
    buyButtonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    inactiveText: {
        fontSize: 12,
        fontWeight: "bold",
        color: palette.lightGray,
        marginTop: 5,
    },
});
