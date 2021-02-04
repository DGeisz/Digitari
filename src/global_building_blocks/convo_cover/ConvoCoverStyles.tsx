import { StyleSheet } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";

export const styles = StyleSheet.create({
    coverContainer: {
        flexDirection: "row",
        backgroundColor: palette.white
    },
    sideBuffer: {
        width: 20
    },
    main: {
        ...basicLayouts.flexGrid1,
        borderBottomColor: palette.softGray,
        borderBottomWidth: 1
    },
    mainHeader: {
        flexDirection:"row",
        marginTop: 5
    },
    mainHeaderLeft: {
        flexDirection: "row",
        ...basicLayouts.flexGrid2
    },
    mainHeaderTextContainer: {
        flexDirection: "row",
        ...basicLayouts.flexGrid3
    },
    coverUserText: {
        fontWeight: "700",
        fontSize: 15,
        marginLeft: 2
    },
    mainHeaderDotText: {
        color: palette.mediumGray,
        marginHorizontal: 2
    },
    coverTimeText: {
        color: palette.mediumOceanSurf,
    },
    mainHeaderRight: {
        ...basicLayouts.grid6,
        marginRight: 3
    },
    mainBody: {
        paddingTop: 8,
        paddingBottom: 15,
    },
    mainBodyText: {
        color: palette.lightGray
    }
});