import { StyleSheet, Dimensions } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const { width } = Dimensions.get("window");

const imageSize = width * 0.5;

export const styles = StyleSheet.create({
    newPostContainer: {
        ...basicLayouts.flexGrid1,
        paddingHorizontal: 10,
    },
    postFieldContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    fieldTitleContainer: {
        flexDirection: "row",
    },
    fieldTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: palette.hardGray,
        marginBottom: 15,
        marginRight: 8,
    },
    contentInput: {
        fontSize: 20,
        marginBottom: 10,
    },
    remainingText: {
        color: palette.mediumGray,
        fontWeight: "500",
    },
    postOptionBar: {
        flexDirection: "row",
        marginBottom: 10,
    },
    activeOption: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: palette.deepBlue,
    },
    activeOptionText: {
        color: palette.white,
        fontWeight: "bold",
        fontSize: 15,
    },
    inactiveOption: {
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    inactiveOptionText: {
        fontWeight: "bold",
        fontSize: 15,
        color: palette.hardGray,
    },
    addOnInput: {
        fontSize: 17,
        marginBottom: 10,
    },
    outerImageContainer: {
        ...basicLayouts.grid4,
    },
    imageContainer: {
        ...basicLayouts.grid5,
    },
    placeHolderImage: {
        ...basicLayouts.grid5,
        backgroundColor: palette.softGray,
        height: imageSize,
        width: imageSize,
        borderRadius: 10,
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: 10,
    },
    selectImageButton: {
        marginTop: 5,
        ...basicLayouts.grid5,
    },
    selectImageText: {
        fontWeight: "bold",
        color: palette.lightGray,
    },
    followersNumeral: {
        fontWeight: "bold",
    },
    followersText: {
        color: palette.hardGray,
        fontSize: 18,
    },
    communityContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: palette.white,
        borderRadius: 10,
        marginBottom: 5,
    },
    selectCommunityText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.lightGray,
    },
    communityText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.hardGray,
        marginBottom: 3,
    },
    commFollowerNumeral: {
        fontWeight: "bold",
    },
    commFollowersText: {
        color: palette.mediumGray,
        fontSize: 16,
    },
    createCommunityButton: {
        marginLeft: 10,
    },
    createCommunityText: {
        fontWeight: "500",
        color: palette.deepBlue,
    },
    recipientsInput: {
        fontSize: 20,
    },
    postFooter: {
        ...basicLayouts.grid5,
        marginTop: 20,
        marginBottom: 40,
    },
    postErrorMessage: {
        fontSize: 16,
        fontWeight: "bold",
        color: palette.danger,
        marginBottom: 10,
    },
    postButton: {
        flexDirection: "row",
        borderColor: palette.deepBlue,
        borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
    },
    postButtonTextContainer: {
        borderRightWidth: 1,
        borderRightColor: palette.lightGray,
        paddingRight: 10,
        marginRight: 3,
    },
    postButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.hardGray,
    },
});
