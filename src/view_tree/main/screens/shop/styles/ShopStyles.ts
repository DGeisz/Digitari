import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { GENERAL_CONTENT_WIDTH } from "../../../../../global_constants/screen_constants";

export const shopStyles = StyleSheet.create({
    outerContainer: {
        ...basicLayouts.flexGrid1,
    },
    container: {
        width: GENERAL_CONTENT_WIDTH,
        alignSelf: "center",
        padding: 20,
    },
});
