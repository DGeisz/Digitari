import { StyleSheet } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { palette } from "../../../../global_styles/Palette";

export const styles = StyleSheet.create({
    socialAuthContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        paddingHorizontal: 30,
    },
    googleContainer: {
        backgroundColor: palette.googleBlue,
        elevation: 2,
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingVertical: 8,
        margin: 7,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    socialIconTitle: {
        color: "white",
        marginLeft: 15,
        fontWeight: "bold",
        fontSize: 18,
    },
    googleIconContainer: {
        ...basicLayouts.grid5,
        padding: 5,
        backgroundColor: palette.white,
        borderRadius: 5,
    },
    orContainer: {
        marginVertical: 20,
        ...basicLayouts.grid5,
        flexDirection: "row",
    },
    orBar: {
        borderBottomWidth: 1,
        borderBottomColor: palette.semiSoftGray,
        flex: 1,
        marginHorizontal: 20,
    },
    orText: {
        fontSize: 18,
        fontWeight: "600",
        color: palette.lightGray,
    },
    emailContainer: {
        elevation: 2,
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingVertical: 14,
        margin: 7,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.deepBlue,
    },
});
