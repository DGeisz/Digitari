import { StyleProp, TextStyle } from "react-native";
import { BioFonts, BioFontsEnum } from "../../../../global_types/ShopTypes";

export function bioFont2Style(font: BioFontsEnum): StyleProp<TextStyle> {
    switch (font) {
        case BioFontsEnum.Default:
            return {
                fontSize: 18,
                lineHeight: 24,
            };
        case BioFontsEnum.WhenTypewriters:
            return {
                fontFamily: BioFonts.WhenTypewriters,
                fontSize: 18,
                lineHeight: 24,
            };
        case BioFontsEnum.Lemonade:
            return {
                fontFamily: BioFonts.Lemonade,
                fontSize: 18,
                lineHeight: 24,
            };
        case BioFontsEnum.OnceUponATime:
            return {
                fontFamily: BioFonts.OnceUponATime,
                fontSize: 18,
                lineHeight: 24,
            };
        case BioFontsEnum.Novel:
            return {
                fontFamily: BioFonts.Novel,
                fontSize: 20,
                lineHeight: 24,
            };
        case BioFontsEnum.DearDiary:
            return {
                fontFamily: BioFonts.DearDiary,
                fontSize: 20,
                lineHeight: 24,
            };
        case BioFontsEnum.MissionBriefing:
            return {
                fontFamily: BioFonts.MissionBriefing,
                fontSize: 18,
                lineHeight: 24,
            };
        case BioFontsEnum.MidsummerFantasy:
            return {
                fontFamily: BioFonts.MidsummerFantasy,
                fontSize: 19,
                lineHeight: 24,
            };
        case BioFontsEnum.SpiritualSciFi:
            return {
                fontFamily: BioFonts.SpiritualSciFi,
                fontSize: 18,
                lineHeight: 24,
            };
    }
}
