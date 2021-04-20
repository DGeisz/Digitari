import { StyleSheet } from "react-native";
import { palette } from "../../../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";

const iconSideLength = 45;

export const styles = StyleSheet.create({
    resultContainer: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: palette.white,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    resultLeft: {
        ...basicLayouts.flexGrid2,
        flexDirection: "row",
    },
    userImageContainer: {
        height: iconSideLength,
        width: iconSideLength,
        borderRadius: 30,
    },
    userIconContainer: {
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        height: iconSideLength,
        width: iconSideLength,
        borderRadius: 30,
    },
    communityIconContainer: {
        ...basicLayouts.grid5,
        height: iconSideLength,
        width: iconSideLength,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: palette.deepBlue,
    },
    resultNameText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.hardGray,
        marginLeft: 10,
    },
    resultRight: {
        ...basicLayouts.grid5,
    },
});
