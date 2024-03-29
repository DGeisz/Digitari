import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";

export const tierBarStyles = StyleSheet.create({
    tierBar: {
        backgroundColor: palette.white,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    tierBarContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    tierOption: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 20,
    },
    tierOptionText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
