import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../../global_styles/Palette";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../../../global_constants/screen_constants";

const SCANNER_SIDE = GENERAL_CONTENT_WIDTH - 80;

export const styles = StyleSheet.create({
    promptContainer: {
        ...basicLayouts.grid2,
        padding: 20,
    },
    promptText: {
        textAlign: "center",
        color: palette.hardGray,
        fontSize: 16,
        marginBottom: 20,
    },
    promptButton: {
        backgroundColor: palette.deepBlue,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    promptButtonText: {
        color: palette.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    scannerContainer: {
        ...basicLayouts.grid2,
        paddingHorizontal: 40,
        paddingTop: 20,
    },
    scannerFrame: {
        height: SCANNER_SIDE,
        width: SCANNER_SIDE,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 10,
    },
    scanner: {
        height: SCANNER_SIDE,
        width: SCANNER_SIDE,
        borderRadius: 20,
    },
    scannerText: {
        fontSize: 16,
        textAlign: "center",
    },
});
