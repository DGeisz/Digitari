import { StyleProp, TextStyle } from "react-native";
import {
    NameFonts,
    NameFontsEnum,
} from "../../../../../../../global_types/ShopTypes";

export function nameFontToStyle(font: NameFontsEnum): StyleProp<TextStyle> {
    switch (font) {
        case NameFontsEnum.Default:
            return {
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
            };
        case NameFontsEnum.LetterJacket:
            return {
                fontFamily: NameFonts.LetterJacket,
                fontSize: 30,
                textAlign: "center",
            };
        case NameFontsEnum.Galaxy9000:
            return {
                fontFamily: NameFonts.Galaxy9000,
                fontSize: 28,
                textAlign: "center",
            };
        case NameFontsEnum.HowdyPartner:
            return {
                fontFamily: NameFonts.HowdyPartner,
                fontSize: 34,
                textAlign: "center",
            };
        case NameFontsEnum.ImAPrincess:
            return {
                fontFamily: NameFonts.ImAPrincess,
                fontSize: 32,
                textAlign: "center",
            };
        case NameFontsEnum.Ole:
            return {
                fontFamily: NameFonts.Ole,
                fontSize: 28,
                textAlign: "center",
            };
        case NameFontsEnum.CheapHalloweenParty:
            return {
                fontFamily: NameFonts.CheapHalloweenParty,
                fontSize: 38,
                textAlign: "center",
            };
        case NameFontsEnum.PassinNotes:
            return {
                fontFamily: NameFonts.PassinNotes,
                fontSize: 30,
                textAlign: "center",
            };
        case NameFontsEnum.Yuck:
            return {
                fontFamily: NameFonts.Yuck,
                fontSize: 28,
                textAlign: "center",
            };
        case NameFontsEnum.OldTyme:
            return {
                fontFamily: NameFonts.OldTyme,
                fontSize: 35,
                textAlign: "center",
            };
        case NameFontsEnum.Arcade:
            return {
                fontFamily: NameFonts.Arcade,
                fontSize: 23,
                textAlign: "center",
            };
        case NameFontsEnum.GirlyGirl:
            return {
                fontFamily: NameFonts.GirlyGirl,
                fontSize: 45,
                textAlign: "center",
            };
        case NameFontsEnum.RollerSkateDate:
            return {
                fontFamily: NameFonts.RollerSkateDate,
                fontSize: 31,
                textAlign: "center",
            };
        case NameFontsEnum.WhamBamKablam:
            return {
                fontFamily: NameFonts.WhamBamKablam,
                fontSize: 36,
                textAlign: "center",
            };
        case NameFontsEnum.Zoom:
            return {
                fontFamily: NameFonts.Zoom,
                fontSize: 35,
                textAlign: "center",
            };
        case NameFontsEnum.ZeusRevenge:
            return {
                fontFamily: NameFonts.ZeusRevenge,
                fontSize: 38,
                textAlign: "center",
            };
        case NameFontsEnum.YuletideBall:
            return {
                fontFamily: NameFonts.YuletideBall,
                fontSize: 38,
                textAlign: "center",
            };
        case NameFontsEnum.GreatGatsby:
            return {
                fontFamily: NameFonts.GreatGatsby,
                fontSize: 28,
                textAlign: "center",
            };
    }
}
