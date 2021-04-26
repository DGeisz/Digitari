import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    tierBar: {
        backgroundColor: palette.white,
        paddingVertical: 10,
        marginBottom: 20,
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
    noPostsContainer: {
        ...basicLayouts.flexGrid5,
        paddingTop: 10,
        paddingHorizontal: 30,
    },
    noPostsText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
        textAlign: "center",
    },
});
