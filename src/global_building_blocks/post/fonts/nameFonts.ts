import { StyleProp, TextStyle } from "react-native";
import { NameFonts } from "../../../global_types/ShopTypes";

export function nameFontToPostStyle(font: NameFonts): StyleProp<TextStyle> {
    switch (font) {
        case NameFonts.Default:
            return {
                fontSize: 14,
                fontWeight: "bold",
            };
        case NameFonts.LetterJacket:
            return {
                fontFamily: NameFonts.LetterJacket,
                fontSize: 14,
                transform: [{ translateY: -1 }],
            };
        case NameFonts.Galaxy9000:
            return {
                fontFamily: NameFonts.Galaxy9000,
                fontSize: 13,
                transform: [{ translateY: -1 }],
            };
        case NameFonts.HowdyPartner:
            return {
                fontFamily: NameFonts.HowdyPartner,
                fontSize: 14,
                transform: [{ translateY: 1 }],
            };
        case NameFonts.ImAPrincess:
            return {
                fontFamily: NameFonts.ImAPrincess,
                fontSize: 15,
                transform: [{ translateY: 2 }],
            };
        case NameFonts.Ole:
            return {
                fontFamily: NameFonts.Ole,
                fontSize: 13,
                transform: [{ translateY: 1 }],
            };
        case NameFonts.CheapHalloweenParty:
            return {
                fontFamily: NameFonts.CheapHalloweenParty,
                fontSize: 16,
            };
        case NameFonts.PassinNotes:
            return {
                fontFamily: NameFonts.PassinNotes,
                fontSize: 14,
                transform: [{ translateY: 5 }],
            };
        case NameFonts.Yuck:
            return {
                fontFamily: NameFonts.Yuck,
                fontSize: 12,
                transform: [{ translateY: 3 }],
            };
        case NameFonts.OldTyme:
            return {
                fontFamily: NameFonts.OldTyme,
                fontSize: 16,
                transform: [{ translateY: 1 }],
            };
        case NameFonts.Arcade:
            return {
                fontFamily: NameFonts.Arcade,
                fontSize: 10,
                transform: [{ translateY: -3 }],
            };
        case NameFonts.GirlyGirl:
            return {
                fontFamily: NameFonts.GirlyGirl,
                fontSize: 15,
                transform: [{ translateY: 2 }],
            };
        case NameFonts.RollerSkateDate:
            return {
                fontFamily: NameFonts.RollerSkateDate,
                fontSize: 13,
                transform: [{ translateY: -3 }],
            };
        case NameFonts.WhamBamKablam:
            return {
                fontFamily: NameFonts.WhamBamKablam,
                fontSize: 16,
            };
        case NameFonts.Zoom:
            return {
                fontFamily: NameFonts.Zoom,
                fontSize: 17,
            };
        case NameFonts.ZeusRevenge:
            return {
                fontFamily: NameFonts.ZeusRevenge,
                fontSize: 17,
                transform: [{ translateY: 1 }],
            };
        case NameFonts.YuletideBall:
            return {
                fontFamily: NameFonts.YuletideBall,
                fontSize: 20,
                lineHeight: 34,
                transform: [{ translateY: 11 }],
            };
        case NameFonts.GreatGatsby:
            return {
                fontFamily: NameFonts.GreatGatsby,
                fontSize: 13,
                transform: [{ translateY: 1 }],
            };
    }
}
