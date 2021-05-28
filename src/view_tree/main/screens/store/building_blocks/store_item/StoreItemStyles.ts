import { StyleSheet } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../global_constants/screen_constants";

export const styles = StyleSheet.create({
    itemContainer: {
        ...basicLayouts.grid2,
        width: GENERAL_CONTENT_WIDTH - 20,
        alignSelf: "center",
        backgroundColor: palette.white,
        marginHorizontal: 10,
        marginTop: 20,
        borderRadius: 20,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    itemTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: palette.deepBlue,
    },
    coinContainer: {
        marginTop: 5,
        marginBottom: 15,
    },
    priceContainer: {
        backgroundColor: palette.deepBlue,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    priceText: {
        fontWeight: "bold",
        color: palette.white,
        fontSize: 18,
    },
});
