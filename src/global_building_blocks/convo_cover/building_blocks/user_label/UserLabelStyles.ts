import { StyleSheet } from "react-native";
import { globalTextStyles } from "../../../../global_styles/GlobalTextStyles";

export const styles = StyleSheet.create({
    labelUserText: {
        ...globalTextStyles.userText,
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 2,
    },
    incognitoStyle: {
        marginLeft: 3,
    },
});
