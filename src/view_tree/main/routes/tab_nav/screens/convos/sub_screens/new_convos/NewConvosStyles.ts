import { StyleSheet } from "react-native";
import { palette } from "../../../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    orderOptionContainer: {
        backgroundColor: palette.white,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    orderByTitle: {
        fontWeight: "bold",
        fontSize: 13,
        color: palette.hardGray,
    },
    orderOptionBar: {
        flexDirection: "row",
        marginVertical: 3,
    },
    orderOption: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    orderOptionText: {
        fontWeight: "bold",
        color: palette.hardGray,
    },
});
