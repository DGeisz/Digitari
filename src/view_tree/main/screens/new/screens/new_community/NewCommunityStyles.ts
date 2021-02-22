import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    newCommunityContainer: {
        ...basicLayouts.flexGrid1,
        padding: 20,
    },
    nameInput: {
        marginBottom: 20,
    },
    createButton: {
        flexDirection: "row",
        backgroundColor: palette.oceanSurf,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    createButtonTextContainer: {
        ...basicLayouts.grid4,
        borderRightWidth: 1,
        borderRightColor: palette.mediumOceanSurf,
        paddingRight: 20,
        marginRight: 3,
    },
    createButtonText: {
        fontWeight: "600",
        fontSize: 18,
        color: palette.hardGray,
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
