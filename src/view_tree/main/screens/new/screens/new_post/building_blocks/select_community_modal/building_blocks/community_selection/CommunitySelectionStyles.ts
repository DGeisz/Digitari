import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../../../../global_styles/Palette";

const iconSideLength = 45;

export const styles = StyleSheet.create({
    selectionContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
        backgroundColor: palette.white,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    iconContainer: {
        ...basicLayouts.grid5,
        height: iconSideLength,
        width: iconSideLength,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: palette.deepBlue,
        marginRight: 5,
    },
    textContainer: {},
    communityName: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.hardGray,
    },
    followsNumeral: {
        fontWeight: "bold",
    },
    followsText: {
        color: palette.lightGray,
    },
});
