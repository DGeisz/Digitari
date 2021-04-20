import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    followingList: {
        ...basicLayouts.flexGrid1,
    },
    noFollowingContainer: {
        ...basicLayouts.flexGrid5,
    },
    noFollowingText: {
        fontSize: 16,
        fontWeight: "600",
        color: palette.lightGray,
    },
    followEntityBar: {
        ...basicLayouts.flexRow,
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: palette.white,
        borderBottomWidth: 1,
        borderBottomColor: palette.softGray,
    },
    followEntity: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },
    followEntityText: {
        fontWeight: "bold",
    },
});
