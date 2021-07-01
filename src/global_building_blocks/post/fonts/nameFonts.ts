import { StyleProp, TextStyle } from "react-native";
import { NameFonts, NameFontsEnum } from "../../../global_types/ShopTypes";

export function nameFontToPostStyle(font: NameFontsEnum): StyleProp<TextStyle> {
    switch (font) {
        case NameFontsEnum.Default:
            return {
                fontSize: 14,
                fontWeight: "bold",
            };
        case NameFontsEnum.LetterJacket:
            return {
                fontFamily: NameFonts.LetterJacket,
                fontSize: 14,
                transform: [{ translateY: -1 }],
            };
        case NameFontsEnum.Galaxy9000:
            return {
                fontFamily: NameFonts.Galaxy9000,
                fontSize: 13,
                transform: [{ translateY: -1 }],
            };
        case NameFontsEnum.HowdyPartner:
            return {
                fontFamily: NameFonts.HowdyPartner,
                fontSize: 14,
                transform: [{ translateY: 1 }],
            };
        case NameFontsEnum.ImAPrincess:
            return {
                fontFamily: NameFonts.ImAPrincess,
                fontSize: 15,
                transform: [{ translateY: 2 }],
            };
        case NameFontsEnum.Ole:
            return {
                fontFamily: NameFonts.Ole,
                fontSize: 13,
                transform: [{ translateY: 1 }],
            };
        case NameFontsEnum.CheapHalloweenParty:
            return {
                fontFamily: NameFonts.CheapHalloweenParty,
                fontSize: 16,
            };
        case NameFontsEnum.PassinNotes:
            return {
                fontFamily: NameFonts.PassinNotes,
                fontSize: 14,
                transform: [{ translateY: 5 }],
            };
        case NameFontsEnum.Yuck:
            return {
                fontFamily: NameFonts.Yuck,
                fontSize: 12,
                transform: [{ translateY: 3 }],
            };
        case NameFontsEnum.OldTyme:
            return {
                fontFamily: NameFonts.OldTyme,
                fontSize: 16,
                transform: [{ translateY: 1 }],
            };
        case NameFontsEnum.Arcade:
            return {
                fontFamily: NameFonts.Arcade,
                fontSize: 10,
                transform: [{ translateY: -3 }],
            };
        case NameFontsEnum.GirlyGirl:
            return {
                fontFamily: NameFonts.GirlyGirl,
                fontSize: 20,
                transform: [{ translateY: 2 }],
            };
        case NameFontsEnum.RollerSkateDate:
            return {
                fontFamily: NameFonts.RollerSkateDate,
                fontSize: 13,
                transform: [{ translateY: -3 }],
            };
        case NameFontsEnum.WhamBamKablam:
            return {
                fontFamily: NameFonts.WhamBamKablam,
                fontSize: 16,
            };
        case NameFontsEnum.Zoom:
            return {
                fontFamily: NameFonts.Zoom,
                fontSize: 17,
            };
        case NameFontsEnum.ZeusRevenge:
            return {
                fontFamily: NameFonts.ZeusRevenge,
                fontSize: 17,
                transform: [{ translateY: 1 }],
            };
        case NameFontsEnum.YuletideBall:
            return {
                fontFamily: NameFonts.YuletideBall,
                fontSize: 20,
                lineHeight: 34,
                transform: [{ translateY: 11 }],
            };
        case NameFontsEnum.GreatGatsby:
            return {
                fontFamily: NameFonts.GreatGatsby,
                fontSize: 13,
                transform: [{ translateY: 1 }],
            };
    }
}
