import { StyleSheet } from "react-native";
import { palette } from "../../global_styles/Palette";
import { basicLayouts } from "../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    challengeContainer: {
        backgroundColor: palette.white,
        padding: 15,
        borderBottomWidth: 1,
        borderColor: palette.softGray,
    },
    challengeTop: {
        flexDirection: "row",
    },
    challengeTopLeft: {
        ...basicLayouts.flexGrid1,
    },
    challengeText: {
        color: palette.hardGray,
        fontSize: 16,
        fontWeight: "500",
    },
    challengeTopRight: {},
    challengeBottom: {
        flexDirection: "row",
        marginTop: 20,
    },
    challengeBottomLeft: {
        ...basicLayouts.flexGrid1,
    },
    challengeProgressBar: {
        ...basicLayouts.flexGrid1,
        borderWidth: 2,
        borderColor: palette.hardGray,
        borderRadius: 10,
        overflow: "hidden",
    },
    challengeProgressFill: {
        backgroundColor: palette.oceanSurf,
        height: 20,
    },
    challengeBottomRight: {
        marginLeft: 10,
    },
    challengeCompletionText: {
        color: palette.hardGray,
        fontWeight: "bold",
    },
});
