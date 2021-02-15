import { StyleSheet } from "react-native";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    authButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    authButtonText: {
        fontWeight: "600",
        color: palette.white,
        fontSize: 22,
    },
});
