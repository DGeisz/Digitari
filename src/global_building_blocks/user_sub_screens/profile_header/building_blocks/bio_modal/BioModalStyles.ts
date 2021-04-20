import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../global_styles/Palette";

const imageSize = 100;

export const styles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid4,
    },
    modalContainer: {
        // ...basicLayouts.flexGrid1,
        backgroundColor: palette.white,
        borderRadius: 30,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.hardGray,
        marginBottom: 20,
    },
    imageSelectorContainer: {
        ...basicLayouts.grid2,
        padding: 20,
    },
    placeHolderPic: {
        ...basicLayouts.grid5,
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize,
        backgroundColor: palette.softGray,
    },
    profilePic: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize,
    },
    selectImageText: {
        marginTop: 5,
        fontWeight: "500",
        color: palette.lightGray,
    },
    bioText: {
        marginHorizontal: 10,
    },
    footer: {
        ...basicLayouts.grid5,
        flexDirection: "row",
        marginBottom: 20,
    },
    cancelButton: {
        backgroundColor: palette.softGray,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        marginRight: 3,
    },
    cancelText: {
        fontWeight: "600",
        fontSize: 16,
        color: palette.mediumGray,
    },
    saveButton: {
        backgroundColor: palette.deepBlue,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        marginRight: 3,
    },
    saveText: {
        fontWeight: "600",
        fontSize: 16,
        color: palette.white,
    },
});
