import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    donateModal: {
        ...basicLayouts.flexGrid5,
    },
    donateContainer: {
        backgroundColor: palette.white,
        paddingVertical: 10,
        width: 250,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    preHeader: {
        ...basicLayouts.grid3,
    },
    innerContainer: {
        marginHorizontal: 20,
    },
    donateHeader: {
        ...basicLayouts.grid2,
    },
    donateTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.hardGray,
    },
    errorText: {
        fontWeight: "bold",
        color: palette.danger,
        marginTop: 5,
    },
    donateInput: {
        borderBottomWidth: 1,
        borderBottomColor: palette.semiSoftGray,
        marginBottom: 30,
        marginTop: 20,
        fontSize: 16,
        paddingBottom: 2,
    },
    donateFooter: {
        // flexDirection: "row",
        ...basicLayouts.grid5,
    },
    cancelButton: {
        ...basicLayouts.grid5,
        backgroundColor: palette.softGray,
        flexDirection: "row",
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 5,
    },
    cancelButtonText: {
        fontSize: 15,
        color: palette.mediumGray,
        fontWeight: "bold",
    },
    donateButton: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: palette.deepBlue,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
    },
    donateButtonTextContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.semiSoftGray,
        paddingRight: 5,
    },
    donateButtonText: {
        fontSize: 15,
        color: palette.hardGray,
        fontWeight: "bold",
    },
});
