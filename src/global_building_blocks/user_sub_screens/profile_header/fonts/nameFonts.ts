import { NameFonts, NameFontsEnum } from "../../../../global_types/ShopTypes";
import { StyleProp, TextStyle } from "react-native";

export function nameFontToProfileStyle(
    font: NameFontsEnum
): StyleProp<TextStyle> {
    switch (font) {
        case NameFontsEnum.Default:
            return {
                fontSize: 22,
                fontWeight: "bold",
            };
        case NameFontsEnum.LetterJacket:
            return {
                fontFamily: NameFonts.LetterJacket,
                fontSize: 22,
            };
        case NameFontsEnum.Galaxy9000:
            return {
                fontFamily: NameFonts.Galaxy9000,
                fontSize: 21,
            };
        case NameFontsEnum.HowdyPartner:
            return {
                fontFamily: NameFonts.HowdyPartner,
                fontSize: 24,
            };
        case NameFontsEnum.ImAPrincess:
            return {
                fontFamily: NameFonts.ImAPrincess,
                fontSize: 23,
            };
        case NameFontsEnum.Ole:
            return {
                fontFamily: NameFonts.Ole,
                fontSize: 20,
            };
        case NameFontsEnum.CheapHalloweenParty:
            return {
                fontFamily: NameFonts.CheapHalloweenParty,
                fontSize: 28,
            };
        case NameFontsEnum.PassinNotes:
            return {
                fontFamily: NameFonts.PassinNotes,
                fontSize: 22,
            };
        case NameFontsEnum.Yuck:
            return {
                fontFamily: NameFonts.Yuck,
                fontSize: 20,
            };
        case NameFontsEnum.OldTyme:
            return {
                fontFamily: NameFonts.OldTyme,
                fontSize: 26,
            };
        case NameFontsEnum.Arcade:
            return {
                fontFamily: NameFonts.Arcade,
                fontSize: 14,
            };
        case NameFontsEnum.GirlyGirl:
            return {
                fontFamily: NameFonts.GirlyGirl,
                fontSize: 30,
            };
        case NameFontsEnum.RollerSkateDate:
            return {
                fontFamily: NameFonts.RollerSkateDate,
                fontSize: 21,
            };
        case NameFontsEnum.WhamBamKablam:
            return {
                fontFamily: NameFonts.WhamBamKablam,
                fontSize: 25,
            };
        case NameFontsEnum.Zoom:
            return {
                fontFamily: NameFonts.Zoom,
                fontSize: 26,
            };
        case NameFontsEnum.ZeusRevenge:
            return {
                fontFamily: NameFonts.ZeusRevenge,
                fontSize: 26,
            };
        case NameFontsEnum.YuletideBall:
            return {
                fontFamily: NameFonts.YuletideBall,
                fontSize: 29,
            };
        case NameFontsEnum.GreatGatsby:
            return {
                fontFamily: NameFonts.GreatGatsby,
                fontSize: 20,
            };
    }
}
