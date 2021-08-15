import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";
import { GENERAL_CONTENT_WIDTH } from "../../../../global_constants/screen_constants";

export const styles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid1,
    },
    container: {
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
    },
    topBarContainer: {
        flexDirection: "row",
        backgroundColor: palette.white,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    option: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    hide: {
        height: 0,
        width: 0,
    },
    optionText: {
        fontWeight: "bold",
    },
    newContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        paddingHorizontal: 60,
    },
    newPostButton: {
        flexDirection: "row",
        ...basicLayouts.grid5,
        backgroundColor: palette.deepBlue,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    newPostButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        color: palette.white,
    },
    newCommunityButton: {
        flexDirection: "row",
        ...basicLayouts.grid5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderColor: palette.deepBlue,
        borderWidth: 2,
        marginTop: 10,
    },
    newCommunityButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        color: palette.deepBlue,
    },
});
