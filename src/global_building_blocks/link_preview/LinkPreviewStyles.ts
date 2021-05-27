import { StyleSheet } from "react-native";
import { palette } from "../../global_styles/Palette";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { GENERAL_CONTENT_WIDTH } from "../../global_constants/screen_constants";

const imageSize = GENERAL_CONTENT_WIDTH * 0.7;

export const styles = StyleSheet.create({
    linkPreviewContainer: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: palette.softGray,
        width: imageSize,
        marginTop: 20,
        borderWidth: 1,
        borderColor: palette.softGray,
    },
    linkPreviewImage: {
        height: 0.7 * imageSize,
        width: imageSize,
    },
    previewFooter: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    footerText: {
        fontSize: 16,
        color: palette.mediumGray,
        fontWeight: "500",
    },
    loadingContainer: {
        ...basicLayouts.grid5,
        padding: 20,
    },
});
