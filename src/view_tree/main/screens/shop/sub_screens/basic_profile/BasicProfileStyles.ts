import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const imageSize = 100;

export const styles = StyleSheet.create({
    imageSelectorContainer: {
        ...basicLayouts.grid2,
        paddingTop: 20,
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
    textInput: {
        marginTop: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: palette.semiSoftGray,
        paddingBottom: 4,
        marginBottom: 3,
    },
    remainingCharacters: {
        fontWeight: "bold",
        color: palette.lightGray,
        fontSize: 13,
    },
    levelGuardText: {
        textAlign: "center",
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 18,
        color: palette.semiSoftGray,
    },
});
