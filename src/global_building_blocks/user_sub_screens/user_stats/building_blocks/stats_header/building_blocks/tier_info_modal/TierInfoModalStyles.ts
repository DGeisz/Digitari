import { StyleSheet, Dimensions } from "react-native";
import { palette } from "../../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../../global_constants/screen_constants";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    iconContainer: {
        paddingLeft: 6,
        paddingRight: 20,
    },
    icon: {
        transform: [
            {
                translateY: -1,
            },
        ],
    },
    modalOuterContainer: {
        ...basicLayouts.flexGrid5,
    },
    modalContainer: {
        backgroundColor: palette.white,
        padding: 20,
        borderRadius: 30,
        maxHeight: height - 80,
        width: GENERAL_CONTENT_WIDTH - 40,
    },
    modalHeader: {
        ...basicLayouts.grid2,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.deepBlue,
        marginBottom: 10,
    },
    calculationContainer: {
        ...basicLayouts.grid2,
        marginTop: 10,
        paddingBottom: 20,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    equationContainer: {
        ...basicLayouts.flexGrid5,
        flexWrap: "wrap",
        backgroundColor: palette.heavySoap,
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    equationLeftContainer: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginTop: 8,
    },
    equationText: {
        fontSize: 16,
        color: palette.hardGray,
        fontWeight: "bold",
    },
    innerCalc: {
        width: 150,
    },
    calcTop: {
        borderBottomColor: palette.lightGray,
        borderBottomWidth: 1,
    },
    calculationRow: {
        ...basicLayouts.grid8,
        flexDirection: "row",
        marginBottom: 10,
    },
    minus: {
        fontSize: 20,
        color: palette.hardGray,
    },
    calculationResult: {
        fontSize: 20,
        color: palette.hardGray,
        fontWeight: "bold",
        marginRight: 8,
    },
    explanationText: {
        marginTop: 10,
        fontSize: 16,
        color: palette.hardGray,
        textAlign: "center",
    },
    convoStreakContainer: {
        paddingBottom: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    streakHeader: {
        textAlign: "center",
        fontWeight: "bold",
        color: palette.hardGray,
        marginBottom: 10,
    },
    ruleContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    ruleLeft: {
        paddingHorizontal: 4,
    },
    ruleRight: {},
    ruleBullet: {
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 20,
    },
    ruleText: {
        fontSize: 16,
        color: palette.hardGray,
    },
    rankingText: {
        fontSize: 20,
        color: palette.hardGray,
        fontWeight: "bold",
        marginRight: 8,
    },
    bigThreeContainer: {},
    /*
     * SymExp -> symbol explanation
     */
    symExpContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    symExpLeft: {
        width: 55,
    },
    symColonContainer: {
        ...basicLayouts.grid8,
        flexDirection: "row",
    },
    colon: {
        fontWeight: "bold",
        color: palette.hardGray,
    },
    symExpRight: {
        ...basicLayouts.flexGrid1,
        marginLeft: 5,
    },
    symExpText: {
        color: palette.hardGray,
    },
    modalFooter: {
        ...basicLayouts.grid5,
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    closeButton: {
        backgroundColor: palette.softGray,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: palette.lightGray,
        fontWeight: "bold",
        fontSize: 18,
    },
});
