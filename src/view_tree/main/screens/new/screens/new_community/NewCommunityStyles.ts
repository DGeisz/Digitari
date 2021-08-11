import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    newCommunityContainer: {
        ...basicLayouts.flexGrid1,
        padding: 20,
    },
    fieldTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: palette.hardGray,
        marginBottom: 10,
    },
    fieldInput: {
        marginBottom: 0,
        fontSize: 18,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: palette.lightGray,
        color: palette.hardGray,
    },
    remainingText: {
        marginTop: 2,
        color: palette.hardGray,
    },
    buffer: {
        height: 30,
    },
    createContainer: {
        ...basicLayouts.flexGrid2,
        marginTop: 20,
    },
    createButton: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: palette.deepBlue,
    },
    createButtonTextContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
        borderRightWidth: 1,
        borderRightColor: palette.lightGray,
        paddingRight: 10,
        marginRight: 3,
    },
    createButtonText: {
        fontWeight: "600",
        fontSize: 18,
        color: palette.hardGray,
        marginRight: 6,
    },
    flyingBoltContainer: {
        transform: [{ translateY: -50 }],
    },
    cantCreateContainer: {
        ...basicLayouts.flexGrid5,
        padding: 10,
    },
    cantCreateText: {
        fontWeight: "500",
        fontSize: 16,
        color: palette.danger,
    },
    errorText: {
        fontWeight: "500",
        fontSize: 16,
        color: palette.danger,
        marginBottom: 10,
    },
});
