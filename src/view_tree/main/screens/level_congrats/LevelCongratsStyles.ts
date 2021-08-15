import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.flexGrid2,
        padding: 20,
    },
    headerContainer: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginBottom: 30,
    },
    confettiContainer: {
        fontSize: 40,
    },
    titleContainer: {
        marginHorizontal: 10,
    },
    title: {
        flexWrap: "wrap",
        fontWeight: "bold",
        flexShrink: 1,
        fontSize: 25,
        color: palette.deepBlue,
        textAlign: "center",
        marginBottom: 3,
    },
    rewardsTitle: {
        fontWeight: "600",
        fontSize: 20,
        color: palette.mediumGray,
    },
    rewardsContainer: {
        backgroundColor: palette.white,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
});
