import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    invitesContainer: {
        ...basicLayouts.flexGrid1,
    },
    invitesHeader: {
        padding: 15,
        backgroundColor: palette.white,
    },
    invitesHeaderText: {
        color: palette.deepBlue,
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 8,
    },
    invitesRemaining: {
        fontWeight: "bold",
        color: palette.lightGray,
    },
    noInvitesContainer: {
        ...basicLayouts.grid2,
        padding: 20,
    },
    noInvitesText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.hardGray,
    },
    promptContainer: {
        ...basicLayouts.grid2,
        padding: 20,
    },
    promptText: {
        textAlign: "center",
        color: palette.hardGray,
        fontSize: 16,
        marginBottom: 20,
    },
    promptButton: {
        backgroundColor: palette.deepBlue,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    promptButtonText: {
        color: palette.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    searchContainer: {
        backgroundColor: palette.white,
        borderBottomColor: palette.transparent,
        borderTopColor: palette.transparent,
        paddingTop: 0,
        borderTopWidth: 2,
    },
    searchInputContainer: {
        backgroundColor: palette.softGray,
        borderRadius: 30,
        paddingHorizontal: 7,
    },
});
