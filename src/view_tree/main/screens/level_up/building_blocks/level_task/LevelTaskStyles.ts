import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const BAR_HEIGHT = 13;

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.flexGrid1,
        paddingTop: 10,
        marginBottom: 15,
        borderTopWidth: 1,
        borderColor: palette.softGray,
    },
    taskDescription: {
        fontWeight: "500",
        fontSize: 16,
        color: palette.hardGray,
    },
    progressContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
        marginTop: 7,
    },
    progressBar: {
        ...basicLayouts.flexGrid1,
        height: BAR_HEIGHT,
        borderRadius: BAR_HEIGHT,
        borderColor: palette.deepBlue,
        borderWidth: 1,
        overflow: "hidden",
    },
    progressFill: {
        backgroundColor: palette.deepBlue,
        height: BAR_HEIGHT,
    },
    numericContainer: {
        marginLeft: 10,
    },
    numericText: {
        color: palette.mediumGray,
        fontWeight: "bold",
    },
});
