import {
    BioFonts,
    BioFontsEnum,
} from "../../../../../../../global_types/ShopTypes";
import { StyleProp, TextStyle } from "react-native";

export function bioFont2Style(font: BioFontsEnum): StyleProp<TextStyle> {
    switch (font) {
        case BioFontsEnum.Default:
            return {
                fontSize: 20,
            };
        case BioFontsEnum.WhenTypewriters:
            return {
                fontFamily: BioFonts.WhenTypewriters,
                fontSize: 20,
                lineHeight: 23,
            };
        case BioFontsEnum.Lemonade:
            return {
                fontFamily: BioFonts.Lemonade,
                fontSize: 20,
            };
        case BioFontsEnum.OnceUponATime:
            return {
                fontFamily: BioFonts.OnceUponATime,
                fontSize: 20,
            };
        case BioFontsEnum.Novel:
            return {
                fontFamily: BioFonts.Novel,
                fontSize: 23,
            };
        case BioFontsEnum.DearDiary:
            return {
                fontFamily: BioFonts.DearDiary,
                fontSize: 22,
            };
        case BioFontsEnum.MissionBriefing:
            return {
                fontFamily: BioFonts.MissionBriefing,
                fontSize: 20,
            };
        case BioFontsEnum.MidsummerFantasy:
            return {
                fontFamily: BioFonts.MidsummerFantasy,
                fontSize: 21,
            };
        case BioFontsEnum.SpiritualSciFi:
            return {
                fontFamily: BioFonts.SpiritualSciFi,
                fontSize: 20,
            };
    }
}
