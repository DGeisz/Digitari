import { StyleSheet, Dimensions } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    modal: {
        padding: 0,
        margin: 0,
    },
    outerContainer: {
        ...basicLayouts.flexGrid1,
    },
    image: {
        width,
        height,
    },
});
