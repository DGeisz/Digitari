import { StyleSheet, Platform } from "react-native";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    authButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    authButtonText: {
        fontWeight: Platform.OS === "ios" ? "600" : "bold",
        color: palette.white,
        fontSize: 22,
    },
});
