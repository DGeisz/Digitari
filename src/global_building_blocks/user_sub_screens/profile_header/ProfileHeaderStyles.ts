import { StyleSheet } from "react-native";
import { palette } from "../../../global_styles/Palette";
import { basicLayouts } from "../../../global_styles/BasicLayouts";

const profilePicSideLength = 58;

export const styles = StyleSheet.create({
    profileHeaderContainer: {
        backgroundColor: palette.white,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 20,
    },
    shopButtonContainer: {
        ...basicLayouts.grid5,
        paddingVertical: 10,
    },
    shopButton: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        backgroundColor: palette.deepBlue,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 10,
    },
    shopButtonText: {
        fontWeight: "bold",
        color: palette.white,
        fontSize: 18,
        marginHorizontal: 3,
    },
    followErrorText: {
        color: palette.danger,
        paddingBottom: 10,
    },
    profileSplit0: {
        flexDirection: "row",
        marginBottom: 10,
    },
    split0Left: {
        ...basicLayouts.flexGrid2,
        flexDirection: "row",
    },
    editProfileText: {
        marginLeft: 8,
        fontWeight: "bold",
        fontSize: 16,
        color: palette.lightGray,
    },
    userImage: {
        height: profilePicSideLength,
        width: profilePicSideLength,
        borderRadius: 30,
        backgroundColor: palette.softGray,
    },
    userIconContainer: {
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        height: profilePicSideLength,
        width: profilePicSideLength,
        borderRadius: 30,
    },
    split0Right: {
        ...basicLayouts.grid5,
    },
    profileSplit1: {
        flexDirection: "row",
    },
    split1Left: {
        flexDirection: "row",
        ...basicLayouts.flexGrid2,
    },
    pulseContainer: {
        position: "absolute",
        left: 9,
        top: 10,
    },
    userLevelContainer: {
        paddingLeft: 5,
    },
    profileUserBar: {
        ...basicLayouts.grid2,
        flexDirection: "row",
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
    statsContainer: {
        flexDirection: "row",
    },
    profileRankingText: {
        fontWeight: "bold",
        color: palette.deepBlue,
        marginRight: 8,
    },
    profileLevelText: {
        fontWeight: "bold",
        color: palette.lightGray,
    },
    profileSplit3: {
        paddingTop: 20,
        paddingBottom: 25,
        paddingRight: 20,
    },
    profileBioText: {
        color: palette.hardGray,
        fontSize: 18,
        lineHeight: 24,
    },
    noBioText: {
        color: palette.semiSoftGray,
        fontSize: 18,
        lineHeight: 24,
        textAlign: "center",
        // fontWeight: "bold"
    },
    profileSplit4: {
        flexDirection: "row",
    },
    split4Left: {
        ...basicLayouts.flexGrid7,
    },
    followsButton: {
        // flexDirection: "row",
    },
    followNumeralText: {
        fontWeight: "700",
        color: palette.hardGray,
        marginRight: 8,
        marginTop: 3,
    },
    followsText: {
        fontWeight: "400",
    },
    followingText: {
        fontWeight: "400",
    },
    split4Right: {
        ...basicLayouts.grid3,
        flexDirection: "row",
        // backgroundColor: "red",
        transform: [{ translateY: 5 }],
    },
});
