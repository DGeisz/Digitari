import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    iconContainer: {
        paddingRight: 20,
    },
    icon: {
        transform: [
            {
                translateY: -1,
            },
        ],
    },
    modalContainer: {
        ...basicLayouts.flexGrid5,
    },
    infoContainer: {
        // ...basicLayouts.grid2,
        backgroundColor: palette.white,
        padding: 20,
        borderRadius: 10,
    },
    infoTitle: {
        color: palette.deepBlue,
        fontWeight: "bold",
        fontSize: 23,
        marginBottom: 10,
        alignSelf: "center",
    },
    infoText: {
        fontSize: 16,
        color: palette.hardGray,
        fontWeight: "500",
        alignSelf: "flex-start",
        lineHeight: 22,
    },
    infoFooter: {
        ...basicLayouts.grid2,
        marginTop: 20,
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
