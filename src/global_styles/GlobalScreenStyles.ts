import { StyleSheet } from "react-native";
import { palette } from "./Palette";

export const globalScreenStyles = StyleSheet.create({
    whiteScreen: {
        backgroundColor: palette.white,
    },
    listFooterBuffer: {
        height: 60,
    },
    headerBuffer: {
        height: 20,
    },
});
