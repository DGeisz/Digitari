import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { globalTextStyles } from "../../global_styles/GlobalTextStyles";
import { palette } from "../../global_styles/Palette";

export const styles = StyleSheet.create({
    walletEntryContainer: {
        flexDirection: "row",
        backgroundColor: palette.white,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    walletEntryLeft: {
        paddingHorizontal: 10,
        ...basicLayouts.grid5,
    },
    entryTimeText: {
        ...globalTextStyles.timeText,
    },
    walletEntryMiddle: {
        ...basicLayouts.flexGrid1,
        paddingRight: 10,
    },
    walletEntryText: {
        color: palette.hardGray,
        fontSize: 16,
        fontWeight: "500",
    },
    walletEntryRight: {
        ...basicLayouts.grid5,
        paddingHorizontal: 10,
        borderLeftColor: palette.oceanSurf,
        borderLeftWidth: 1,
    },
});
