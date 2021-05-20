import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

const iconSideLength = 45;

export const styles = StyleSheet.create({
    container: {
        ...basicLayouts.flexGrid2,
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    iconContainer: {
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        height: iconSideLength,
        width: iconSideLength,
        borderRadius: 30,
    },
    icon: {},
    image: {
        height: iconSideLength,
        width: iconSideLength,
        borderRadius: 30,
    },
    nameText: {
        ...basicLayouts.flexGrid1,
        marginLeft: 10,
        fontSize: 20,
        color: palette.hardGray,
        fontWeight: "bold",
        flexWrap: "wrap",
    },
    phoneNumberContainer: {
        ...basicLayouts.grid2,
    },
    phoneNumberLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: palette.hardGray,
        marginBottom: 3,
    },
    phoneNumberText: {
        fontSize: 15,
        color: palette.hardGray,
    },
});
