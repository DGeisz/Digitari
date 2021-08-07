import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const BAR_HEIGHT = 13;

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.flexGrid1,
        marginTop: 20,
    },
    taskDescription: {
        fontWeight: "500",
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
        color: palette.hardGray,
        fontWeight: "500",
    },
});
