import { StyleProp, TextStyle } from "react-native";
import { NameFonts } from "../../../../../../../global_types/ShopTypes";

export function nameFontToStyle(font: NameFonts): StyleProp<TextStyle> {
    switch (font) {
        case NameFonts.Default:
            return {
                fontSize: 30,
                fontWeight: "bold",
            };
        case NameFonts.LetterJacket:
            return {
                fontFamily: NameFonts.LetterJacket,
                fontSize: 30,
            };
        case NameFonts.Galaxy9000:
            return {
                fontFamily: NameFonts.Galaxy9000,
                fontSize: 28,
            };
        case NameFonts.HowdyPartner:
            return {
                fontFamily: NameFonts.HowdyPartner,
                fontSize: 34,
            };
        case NameFonts.FreshmanDorm:
            return {
                fontFamily: NameFonts.FreshmanDorm,
                fontSize: 27,
            };
        case NameFonts.ImAPrincess:
            return {
                fontFamily: NameFonts.ImAPrincess,
                fontSize: 32,
            };
        case NameFonts.Ole:
            return {
                fontFamily: NameFonts.Ole,
                fontSize: 28,
            };
        case NameFonts.CheapHalloweenParty:
            return {
                fontFamily: NameFonts.CheapHalloweenParty,
                fontSize: 38,
            };
        case NameFonts.PassinNotes:
            return {
                fontFamily: NameFonts.PassinNotes,
                fontSize: 30,
            };
        case NameFonts.Yuck:
            return {
                fontFamily: NameFonts.Yuck,
                fontSize: 28,
            };
        case NameFonts.OldTyme:
            return {
                fontFamily: NameFonts.OldTyme,
                fontSize: 35,
            };
        case NameFonts.Arcade:
            return {
                fontFamily: NameFonts.Arcade,
                fontSize: 23,
            };
        case NameFonts.GirlyGirl:
            return {
                fontFamily: NameFonts.GirlyGirl,
                fontSize: 34,
            };
        case NameFonts.RollerSkateDate:
            return {
                fontFamily: NameFonts.RollerSkateDate,
                fontSize: 31,
            };
        case NameFonts.WhamBamKablam:
            return {
                fontFamily: NameFonts.WhamBamKablam,
                fontSize: 36,
            };
        case NameFonts.Zoom:
            return {
                fontFamily: NameFonts.Zoom,
                fontSize: 35,
            };
        case NameFonts.ZeusRevenge:
            return {
                fontFamily: NameFonts.ZeusRevenge,
                fontSize: 38,
            };
        case NameFonts.YuletideBall:
            return {
                fontFamily: NameFonts.YuletideBall,
                fontSize: 38,
            };
        case NameFonts.GreatGatsby:
            return {
                fontFamily: NameFonts.GreatGatsby,
                fontSize: 28,
            };
    }
}
