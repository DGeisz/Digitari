import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid1,
        padding: 20,
    },
    settingsBubble: {
        backgroundColor: palette.white,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 20,
    },
    settingsFirstRow: {
        paddingVertical: 15,
    },
    settingsRow: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: palette.softGray,
    },
    settingsRowText: {
        color: palette.hardGray,
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteAccountText: {
        color: palette.danger,
        fontWeight: "bold",
        fontSize: 16,
    },
});
