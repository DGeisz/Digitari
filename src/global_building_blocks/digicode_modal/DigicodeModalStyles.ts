import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    codeContainer: {
        ...basicLayouts.grid5,
        paddingVertical: 15,
    },
    modalText: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 15,
    },
});
