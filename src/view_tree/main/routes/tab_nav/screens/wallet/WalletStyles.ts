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
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.deepBlue,
    },
    entryContainer: {
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 10,
        marginHorizontal: 20,
        marginTop: 20,
    },
    entryTitleContainer: {
        ...basicLayouts.grid2,
    },
    entryTitle: {
        fontWeight: "bold",
        color: palette.hardGray,
    },
    bottomEntryContainer: {
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 10,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    bonusOuterContainer: {
        ...basicLayouts.grid2,
    },
    bonusInnerContainer: {
        ...basicLayouts.grid2,
        backgroundColor: palette.goldFlake,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    bonusTitle: {
        color: palette.darkGold,
        fontWeight: "bold",
        marginBottom: 5,
    },
    bonusTimeRemaining: {
        color: palette.darkGold,
        fontWeight: "bold",
        fontSize: 20,
    },
    barHeader: {
        flexDirection: "row",
    },
    barHeaderLeft: {
        ...basicLayouts.flexGrid2,
        flexDirection: "row",
    },
    maxCapacityText: {
        marginLeft: 5,
        fontWeight: "bold",
        fontSize: 12,
        color: palette.mediumGray,
    },
    barHeaderRight: {
        ...basicLayouts.flexGrid6,
    },
    upgradeButton: {
        marginRight: 5,
    },
    upgradeText: {
        fontSize: 12,
        fontWeight: "bold",
        color: palette.deepBlue,
    },
    totalBar: {
        ...basicLayouts.flexGrid1,
        height: 15,
        backgroundColor: palette.heavySoap,
        borderColor: palette.mediumGray,
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
    },
    barFiller: {
        ...basicLayouts.flexGrid1,
        backgroundColor: palette.deepBlue,
    },
    totalContainer: {
        ...basicLayouts.grid5,
        marginTop: 4,
        flexDirection: "row",
    },
    totalTitle: {
        fontWeight: "bold",
        color: palette.hardGray,
        fontSize: 18,
    },
    earningsFooter: {
        ...basicLayouts.grid5,
        paddingVertical: 10,
    },
    shockBox: {
        flexDirection: "row",
        position: "absolute",
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
    noTransactionsContainer: {
        ...basicLayouts.grid5,
        // marginTop: 20,
    },
    noTransactionText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
        textAlign: "center",
        marginHorizontal: 20,
    },
    transChoiceContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    choiceButton: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    choiceButtonText: {
        fontWeight: "bold",
    },
});
