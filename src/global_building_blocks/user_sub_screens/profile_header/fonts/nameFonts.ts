import { NameFonts } from "../../../../global_types/ShopTypes";
import { StyleProp, TextStyle } from "react-native";

export function nameFontToProfileStyle(font: NameFonts): StyleProp<TextStyle> {
    switch (font) {
        case NameFonts.Default:
            return {
                fontSize: 22,
                fontWeight: "bold",
            };
        case NameFonts.LetterJacket:
            return {
                fontFamily: NameFonts.LetterJacket,
                fontSize: 22,
            };
        case NameFonts.Galaxy9000:
            return {
                fontFamily: NameFonts.Galaxy9000,
                fontSize: 21,
            };
        case NameFonts.HowdyPartner:
            return {
                fontFamily: NameFonts.HowdyPartner,
                fontSize: 24,
            };
        case NameFonts.FreshmanDorm:
            return {
                fontFamily: NameFonts.FreshmanDorm,
                fontSize: 20,
            };
        case NameFonts.ImAPrincess:
            return {
                fontFamily: NameFonts.ImAPrincess,
                fontSize: 23,
            };
        case NameFonts.Ole:
            return {
                fontFamily: NameFonts.Ole,
                fontSize: 20,
            };
        case NameFonts.CheapHalloweenParty:
            return {
                fontFamily: NameFonts.CheapHalloweenParty,
                fontSize: 28,
            };
        case NameFonts.PassinNotes:
            return {
                fontFamily: NameFonts.PassinNotes,
                fontSize: 22,
            };
        case NameFonts.Yuck:
            return {
                fontFamily: NameFonts.Yuck,
                fontSize: 20,
            };
        case NameFonts.OldTyme:
            return {
                fontFamily: NameFonts.OldTyme,
                fontSize: 26,
            };
        case NameFonts.Arcade:
            return {
                fontFamily: NameFonts.Arcade,
                fontSize: 14,
            };
        case NameFonts.GirlyGirl:
            return {
                fontFamily: NameFonts.GirlyGirl,
                fontSize: 25,
            };
        case NameFonts.RollerSkateDate:
            return {
                fontFamily: NameFonts.RollerSkateDate,
                fontSize: 21,
            };
        case NameFonts.WhamBamKablam:
            return {
                fontFamily: NameFonts.WhamBamKablam,
                fontSize: 25,
            };
        case NameFonts.Zoom:
            return {
                fontFamily: NameFonts.Zoom,
                fontSize: 26,
            };
        case NameFonts.ZeusRevenge:
            return {
                fontFamily: NameFonts.ZeusRevenge,
                fontSize: 26,
            };
        case NameFonts.YuletideBall:
            return {
                fontFamily: NameFonts.YuletideBall,
                fontSize: 29,
            };
        case NameFonts.GreatGatsby:
            return {
                fontFamily: NameFonts.GreatGatsby,
                fontSize: 20,
            };
    }
}
