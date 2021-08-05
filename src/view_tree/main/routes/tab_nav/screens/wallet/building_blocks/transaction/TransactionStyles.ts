import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    transactionContainer: {
        marginHorizontal: 10,
        flexDirection: "row",
        backgroundColor: palette.white,
        paddingVertical: 10,
        borderTopColor: palette.softGray,
        borderTopWidth: 1,
        borderBottomColor: palette.softGray,
    },
    timeContainer: {
        paddingHorizontal: 10,
        ...basicLayouts.grid5,
    },
    timeText: {
        color: palette.lightGray,
    },
    messageContainer: {
        ...basicLayouts.flexGrid4,
        paddingHorizontal: 10,
    },
    messageText: {
        color: palette.hardGray,
        fontSize: 16,
        // fontWeight: "500",
    },
    coinContainer: {
        ...basicLayouts.grid5,
        paddingRight: 10,
        borderRightColor: palette.softGray,
        borderRightWidth: 1,
        width: 60,
        // borderRightColor: palette.softGray,
        // borderRightWidth: 1,
    },
    userIcon: {
        marginBottom: 2,
    },
});
