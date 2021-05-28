import { StyleSheet, Dimensions } from "react-native";
import { GENERAL_CONTENT_WIDTH } from "../../../../global_constants/screen_constants";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    modal: {
        padding: 0,
        margin: 0,
    },
    outerContainer: {
        ...basicLayouts.flexGrid5,
    },
    image: {
        width: GENERAL_CONTENT_WIDTH,
        height,
    },
});
