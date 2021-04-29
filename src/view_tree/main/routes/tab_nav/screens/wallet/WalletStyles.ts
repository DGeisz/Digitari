import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";
import { DefaultTheme } from "@react-navigation/native";

export const styles = StyleSheet.create({
    walletList: {
        backgroundColor: palette.white,
    },
    earningsContainer: {
        paddingHorizontal: 10,
    },
    headerContainer: {
        ...basicLayouts.grid5,
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.deepBlue,
    },
    entryContainer: {
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
        paddingTop: 5,
        marginBottom: 10,
    },
    entryTitle: {
        fontWeight: "bold",
        color: palette.hardGray,
        marginBottom: 5,
    },
    totalTitle: {
        fontWeight: "bold",
        color: palette.hardGray,
        fontSize: 20,
    },
    earningsFooter: {
        ...basicLayouts.grid5,
        paddingVertical: 10,
    },
    collectButton: {
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    collectButtonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: palette.white,
    },
    headerBuffer: {
        height: 25,
        backgroundColor: DefaultTheme.colors.background,
    },
    listFooter: {
        height: 80,
    },
});
