import { StyleProp, TextStyle } from "react-native";
import { palette } from "../global_styles/Palette";

export enum NameFontsEnum {
    Default,
    LetterJacket,
    Galaxy9000,
    HowdyPartner,
    ImAPrincess,
    Ole,
    CheapHalloweenParty,
    PassinNotes,
    Yuck,
    OldTyme,
    Arcade,
    GirlyGirl,
    WhamBamKablam,
    RollerSkateDate,
    Zoom,
    ZeusRevenge,
    YuletideBall,
    GreatGatsby,
}

export enum NameFonts {
    Default = "Default",
    LetterJacket = "Graduate_400Regular",
    Galaxy9000 = "Orbitron_700Bold",
    HowdyPartner = "Sancreek_400Regular",
    ImAPrincess = "PrincessSofia_400Regular",
    Ole = "Frijole_400Regular",
    CheapHalloweenParty = "Creepster_400Regular",
    PassinNotes = "HomemadeApple_400Regular",
    Yuck = "Nosifer_400Regular",
    OldTyme = "UnifrakturMaguntia_400Regular",
    Arcade = "PressStart2P_400Regular",
    GirlyGirl = "Bonbon_400Regular",
    RollerSkateDate = "BungeeShade_400Regular",
    WhamBamKablam = "Bangers_400Regular",
    Zoom = "FasterOne_400Regular",
    ZeusRevenge = "CaesarDressing_400Regular",
    YuletideBall = "Ballet_400Regular",
    GreatGatsby = "Monoton_400Regular",
}

export function nameFontEnum2FontName(font: NameFontsEnum): NameFonts {
    switch (font) {
        case NameFontsEnum.Default:
            return NameFonts.Default;
        case NameFontsEnum.LetterJacket:
            return NameFonts.LetterJacket;
        case NameFontsEnum.Galaxy9000:
            return NameFonts.Galaxy9000;
        case NameFontsEnum.HowdyPartner:
            return NameFonts.HowdyPartner;
        case NameFontsEnum.ImAPrincess:
            return NameFonts.ImAPrincess;
        case NameFontsEnum.Ole:
            return NameFonts.Ole;
        case NameFontsEnum.CheapHalloweenParty:
            return NameFonts.CheapHalloweenParty;
        case NameFontsEnum.PassinNotes:
            return NameFonts.PassinNotes;
        case NameFontsEnum.Yuck:
            return NameFonts.Yuck;
        case NameFontsEnum.OldTyme:
            return NameFonts.OldTyme;
        case NameFontsEnum.Arcade:
            return NameFonts.Arcade;
        case NameFontsEnum.GirlyGirl:
            return NameFonts.GirlyGirl;
        case NameFontsEnum.RollerSkateDate:
            return NameFonts.RollerSkateDate;
        case NameFontsEnum.WhamBamKablam:
            return NameFonts.WhamBamKablam;
        case NameFontsEnum.Zoom:
            return NameFonts.Zoom;
        case NameFontsEnum.ZeusRevenge:
            return NameFonts.ZeusRevenge;
        case NameFontsEnum.YuletideBall:
            return NameFonts.YuletideBall;
        case NameFontsEnum.GreatGatsby:
            return NameFonts.GreatGatsby;
    }
}

export function nameFont2Name(font: NameFontsEnum): string {
    switch (font) {
        case NameFontsEnum.Default:
            return "Default";
        case NameFontsEnum.LetterJacket:
            return "Letter Jacket";
        case NameFontsEnum.Galaxy9000:
            return "Galaxy 9000";
        case NameFontsEnum.HowdyPartner:
            return "Howdy partner";
        case NameFontsEnum.ImAPrincess:
            return "I'm a princess";
        case NameFontsEnum.Ole:
            return "Salsa Picante";
        case NameFontsEnum.CheapHalloweenParty:
            return "Cheap halloween party";
        case NameFontsEnum.PassinNotes:
            return "Passin' notes in class";
        case NameFontsEnum.Yuck:
            return "...yuck?";
        case NameFontsEnum.OldTyme:
            return "Olde Tyme";
        case NameFontsEnum.Arcade:
            return "80s Arcade";
        case NameFontsEnum.GirlyGirl:
            return "Girly girl";
        case NameFontsEnum.RollerSkateDate:
            return "Roller Skate Date";
        case NameFontsEnum.WhamBamKablam:
            return "Wham! Bam! Kablam!";
        case NameFontsEnum.Zoom:
            return "Zooooom!";
        case NameFontsEnum.ZeusRevenge:
            return "Zeus' revenge";
        case NameFontsEnum.YuletideBall:
            return "Yuletide ball";
        case NameFontsEnum.GreatGatsby:
            return "Great frikin' Gatsby";
    }
}
export enum ProfileColors {
    Default,
}

export function profileColor2Style(color: ProfileColors): StyleProp<TextStyle> {
    switch (color) {
        case ProfileColors.Default:
            return {
                color: palette.hardGray,
            };
    }
}

export enum ProfileStickers {
    Default,
}
