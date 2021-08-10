import { StyleSheet } from "react-native";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../global_constants/screen_constants";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const imageSize = GENERAL_CONTENT_WIDTH * 0.5;

export const styles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid1,
    },
    newPostContainer: {
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    targetContainer: {
        ...basicLayouts.grid2,
        flexWrap: "wrap",
        flexDirection: "row",
    },
    arrowContainer: {
        marginRight: 3,
    },
    targetTextContainer: {
        ...basicLayouts.flexGrid1,
    },
    targetText: {
        color: palette.hardGray,
        fontWeight: "bold",
    },
    targetFollowersText: {
        color: palette.lightGray,
        fontWeight: "400",
    },
    editTargetContainer: {
        ...basicLayouts.grid6,
        marginLeft: 40,
    },
    editTargetButton: {},
    editTargetText: {
        color: palette.deepBlue,
    },
    targetSelectorContainer: {},
    postContentContainer: {
        paddingVertical: 15,
        borderColor: palette.softGray,
        borderTopWidth: 1,
        marginTop: 8,
    },
    recipientsHidden: {
        height: 0,
        overflow: "hidden",
    },
    recipientsContainer: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: palette.softGray,
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
    addOnTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: palette.hardGray,
        marginLeft: 5,
    },
    contentInput: {
        fontSize: 22,
        marginBottom: 5,
    },
    showAddOnButton: {
        ...basicLayouts.grid2,
        marginTop: 10,
        flexDirection: "row",
    },
    remainingText: {
        color: palette.mediumGray,
        fontWeight: "500",
    },
    postOptionBar: {
        ...basicLayouts.grid2,
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
        color: palette.lightGray,
        marginLeft: 10,
    },
    sendToTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: palette.hardGray,
        marginRight: 3,
        marginBottom: 5,
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
        color: palette.lightGray,
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
        marginBottom: 10,
    },
    maxRecipientsText: {
        fontSize: 12,
        fontWeight: "bold",
        color: palette.semiSoftGray,
    },
    postFooter: {
        ...basicLayouts.grid5,
        opacity: 0.2,
        marginBottom: 40,
        marginTop: 20,
    },
    flyingBoltContainer: {
        ...basicLayouts.grid2,
        transform: [
            {
                translateY: 40,
            },
        ],
    },
    postErrorMessage: {
        fontSize: 16,
        fontWeight: "bold",
        color: palette.danger,
        marginBottom: 10,
    },
    postButton: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        flexWrap: "wrap",
        borderWidth: 2,
        borderColor: palette.deepBlue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
    },
    postButtonTextContainer: {
        ...basicLayouts.grid2,
        flexDirection: "row",
        borderRightWidth: 1,
        borderRightColor: palette.lightGray,
        paddingRight: 10,
        marginRight: 3,
    },
    postButtonText: {
        marginRight: 5,
        fontSize: 18,
        fontWeight: "bold",
    },
});
