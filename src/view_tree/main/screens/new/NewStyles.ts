import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    newContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        paddingHorizontal: 60,
    },
    newPostButton: {
        flexDirection: "row",
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    newPostButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        color: palette.white,
    },
    newCommunityButton: {
        flexDirection: "row",
        ...basicLayouts.grid5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderColor: palette.deepBlue,
        borderWidth: 2,
        marginTop: 10,
    },
    newCommunityButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        color: palette.deepBlue,
    },
});
