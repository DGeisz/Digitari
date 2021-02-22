import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";

export const styles = StyleSheet.create({
    newCommunityContainer: {
        ...basicLayouts.flexGrid1,
        padding: 20,
    },
    nameInput: {
        marginBottom: 20,
    },
});
