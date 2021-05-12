import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    infoContainer: {
        // ...basicLayouts.grid2,
        // flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    infoRight: {
        ...basicLayouts.grid2,
        flexDirection: "row",
    },
    infoRightLeft: {},
    infoRightRight: {},
    infoHeader: {
        flexDirection: "row",
        marginBottom: 15,
    },
    rankingContainer: {
        marginLeft: 5,
    },
    rankingTitle: {
        fontWeight: "bold",
        color: palette.deepBlue,
    },
    rankingText: {
        fontWeight: "600",
        color: palette.hardGray,
        fontSize: 25,
    },
    infoBar: {
        // flexDirection: "row",
    },
    singleInfo: {
        marginBottom: 8,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    infoTitle: {
        fontWeight: "bold",
        color: palette.mediumGray,
    },
    infoText: {
        fontWeight: "600",
        color: palette.hardGray,
        fontSize: 17,
    },
    coinContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
        transform: [
            {
                translateX: -5,
            },
        ],
    },
});
