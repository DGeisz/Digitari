/**
 * Contains basic container styles
 * frequently encountered
 */
import { StyleSheet } from "react-native";

/**
 * Grid styles are defined as follows:
 *
 * 1 2 3
 * 4 5 6
 * 7 8 9
 *
 * The number corresponds to the direction elements are pushed
 */

export const basicLayouts = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
    },

    flexGrid1: {
        flex: 1,
    },

    flexGrid2: {
        flex: 1,
        alignItems: "center",
    },

    flexGrid3: {
        flex: 1,
        alignItems: "flex-end",
    },

    flexGrid4: {
        flex: 1,
        justifyContent: "center",
    },

    flexGrid5: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    flexGrid6: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },

    flexGrid7: {
        flex: 1,
        justifyContent: "flex-end",
    },

    flexGrid8: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },

    flexGrid9: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },

    grid2: {
        alignItems: "center",
    },

    grid3: {
        alignItems: "flex-end",
    },

    grid4: {
        alignItems: "flex-start",
        justifyContent: "center",
    },

    grid5: {
        justifyContent: "center",
        alignItems: "center",
    },

    grid6: {
        justifyContent: "center",
        alignItems: "flex-end",
    },

    grid7: {
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },

    grid8: {
        justifyContent: "flex-end",
        alignItems: "center",
    },

    grid9: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
});
