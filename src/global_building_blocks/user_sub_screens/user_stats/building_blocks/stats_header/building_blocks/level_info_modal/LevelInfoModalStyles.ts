import { Dimensions, StyleSheet } from "react-native";
import { MAX_FEED_WIDTH } from "../../../../../../../global_constants/screen_constants";
import { basicLayouts } from "../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../global_styles/Palette";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    iconContainer: {
        paddingLeft: 6,
    },
    icon: {
        transform: [
            {
                translateY: -1,
            },
        ],
    },
    modalOuterContainer: {
        ...basicLayouts.flexGrid5,
    },
    modalContainer: {
        backgroundColor: palette.white,
        padding: 20,
        borderRadius: 30,
        maxHeight: height - 80,
        maxWidth: MAX_FEED_WIDTH,
    },
    modalHeader: {
        ...basicLayouts.grid2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: palette.deepBlue,
        marginBottom: 10,
    },
    headerBody: {
        fontSize: 16,
        color: palette.hardGray,
    },
    modalFooter: {
        ...basicLayouts.grid5,
        paddingVertical: 10,
    },
    closeButton: {
        backgroundColor: palette.softGray,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: palette.lightGray,
        fontWeight: "bold",
        fontSize: 18,
    },
});
