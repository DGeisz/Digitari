import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { palette } from "../../../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    followersList: {
        ...basicLayouts.flexGrid1,
    },
    noFollowersContainer: {
        ...basicLayouts.flexGrid5,
    },
    noFollowersText: {
        fontSize: 16,
        fontWeight: "600",
        color: palette.lightGray,
    },
});
