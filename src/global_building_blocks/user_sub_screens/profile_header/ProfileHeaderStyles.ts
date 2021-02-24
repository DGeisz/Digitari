import { StyleSheet } from "react-native";
import { palette } from "../../../global_styles/Palette";
import { basicLayouts } from "../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    profileHeaderContainer: {
        backgroundColor: palette.white,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 20,
    },
    followErrorText: {
        color: palette.danger,
        paddingBottom: 10,
    },
    profileSplit1: {
        flexDirection: "row",
    },
    split1Left: {
        flexDirection: "row",
        ...basicLayouts.flexGrid2,
    },
    userLevelContainer: {
        paddingLeft: 5,
    },
    profileUserText: {
        fontSize: 22,
        fontWeight: "700",
        color: palette.hardGray,
    },
    split1Right: {
        ...basicLayouts.grid5,
    },
    followButton: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: palette.deepBlue,
        borderRadius: 20,
    },
    followButtonTextContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.softGray,
        paddingRight: 10,
    },
    followButtonText: {
        color: palette.hardGray,
        fontSize: 15,
        fontWeight: "bold",
        paddingVertical: 5,
    },
    profileLevelText: {
        fontWeight: "600",
        color: palette.lightGray,
    },
    profileSplit3: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    profileBioText: {
        color: palette.hardGray,
        fontSize: 18,
    },
    profileSplit4: {
        flexDirection: "row",
    },
    split4Left: {
        ...basicLayouts.flexGrid7,
    },
    followsButton: {
        flexDirection: "row",
    },
    followNumeralText: {
        fontWeight: "700",
        color: palette.hardGray,
        marginRight: 8,
    },
    followsText: {
        fontWeight: "400",
    },
    followingText: {
        fontWeight: "400",
    },
    split4Right: {},
});
