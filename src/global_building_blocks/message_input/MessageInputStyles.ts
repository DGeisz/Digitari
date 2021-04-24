import { StyleSheet, Dimensions } from "react-native";
import { palette } from "../../global_styles/Palette";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    inputContainer: {
        paddingVertical: 10,
        backgroundColor: "white",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: palette.softGray,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: palette.brightBlue,
        borderWidth: 1,
        borderColor: palette.oceanSurf,
        fontSize: 16,
        marginRight: 10,
        maxHeight: 120,
    },
    disabledInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: palette.soapStone,
        borderWidth: 1,
        borderColor: palette.softGray,
        marginRight: 10,
        maxHeight: 120,
    },
    disabledText: {
        fontSize: 16,
        color: palette.semiSoftGray,
    },
    inputExtras: {
        alignItems: "flex-start",
    },
    evidenceContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    evidenceButton: {
        flexDirection: "row",
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    evidenceText: {
        color: palette.primary,
        textAlign: "left",
    },
    literallyGarbage: {},

    confirmMessageModal: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
    },
    modalTitle: {
        fontWeight: "600",
        fontSize: 18,
        color: palette.darkForestGreen,
        marginBottom: 10,
    },
    messageContainer: {
        padding: 10,
        maxHeight: height / 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: palette.lightForestGreen,
    },
});
