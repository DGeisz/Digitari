import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    feedContainer: {
        ...basicLayouts.flexGrid1,
    },
    selectBar: {
        flexDirection: "row",
        backgroundColor: palette.white,
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    selectButton: {
        marginRight: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    selectText: {
        fontWeight: "bold",
        color: palette.hardGray,
    },
    noFeedContainer: {
        ...basicLayouts.flexGrid5,
        paddingHorizontal: 30,
    },
    noFeedText: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.semiSoftGray,
        textAlign: "center",
    },
    refreshText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: palette.deepBlue,
    },
});
