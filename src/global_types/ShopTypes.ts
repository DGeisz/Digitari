import { StyleProp, StyleSheet, TextStyle } from "react-native";
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
    GirlyGirl = "ButterflyKids_400Regular",
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
    BloodStain,
    Stop,
    LastSunset,
    PlasticDollhouse,
    AlaskanSockeye,
    DarkForest,
    AboveTreeline,
    CrackinGlowSticks,
    AllHail,
    BlacklitRave,
    FirstTeaParty,
    MadeThePodium,
    SoClose,
    ChampionOfTheWorld,
}

export function profileColor2Style(color: ProfileColors): StyleProp<TextStyle> {
    switch (color) {
        case ProfileColors.Default:
            return {
                color: palette.hardGray,
            };
        case ProfileColors.BloodStain:
            return {
                color: palette.bloodStain,
            };
        case ProfileColors.Stop:
            return {
                color: palette.stop,
            };
        case ProfileColors.LastSunset:
            return {
                color: palette.slush,
            };
        case ProfileColors.PlasticDollhouse:
            return {
                color: palette.dollhouse,
            };
        case ProfileColors.AlaskanSockeye:
            return {
                color: palette.salmon,
            };
        case ProfileColors.DarkForest:
            return {
                color: palette.darkForestGreen,
            };
        case ProfileColors.AboveTreeline:
            return {
                color: palette.quasiLightForestGreen,
            };
        case ProfileColors.CrackinGlowSticks:
            return {
                color: palette.terminalGreen,
            };
        case ProfileColors.AllHail:
            return {
                color: palette.royalty,
            };
        case ProfileColors.BlacklitRave:
            return {
                color: palette.blackLight,
            };
        case ProfileColors.FirstTeaParty:
            return {
                color: palette.teaParty,
            };
        case ProfileColors.MadeThePodium:
            return {
                color: palette.bronze,
            };
        case ProfileColors.SoClose:
            return {
                color: palette.silver,
            };
        case ProfileColors.ChampionOfTheWorld:
            return {
                color: palette.gold,
            };
    }
}

export function profileColor2Name(color: ProfileColors): string {
    switch (color) {
        case ProfileColors.Default:
            return "Default";
        case ProfileColors.BloodStain:
            return "Blood Stain";
        case ProfileColors.Stop:
            return "STOP";
        case ProfileColors.LastSunset:
            return "Last Summer Sunset";
        case ProfileColors.PlasticDollhouse:
            return "Plastic Dollhouse";
        case ProfileColors.AlaskanSockeye:
            return "Alaskan sockeye";
        case ProfileColors.DarkForest:
            return "The Dark Forest";
        case ProfileColors.AboveTreeline:
            return "Above Treeline";
        case ProfileColors.CrackinGlowSticks:
            return "Crackin' Glow Sticks";
        case ProfileColors.AllHail:
            return "All Hail the King";
        case ProfileColors.BlacklitRave:
            return "Blacklight Rave";
        case ProfileColors.FirstTeaParty:
            return "Your First Tea Party";
        case ProfileColors.MadeThePodium:
            return "Made the Podium";
        case ProfileColors.SoClose:
            return "So Close";
        case ProfileColors.ChampionOfTheWorld:
            return "Champion of the World";
    }
}

export enum BioFontsEnum {
    Default,
    DearDiary,
    Lemonade,
    OnceUponATime,
    Novel,
    WhenTypewriters,
    MissionBriefing,
    MidsummerFantasy,
    SpiritualSciFi,
}

export enum BioFonts {
    Default = "Default",
    WhenTypewriters = "SpecialElite_400Regular",
    Lemonade = "PoiretOne_400Regular",
    OnceUponATime = "BerkshireSwash_400Regular",
    Novel = "CormorantGaramond_400Regular",
    DearDiary = "IndieFlower_400Regular",
    MissionBriefing = "Quantico_400Regular",
    MidsummerFantasy = "MacondoSwashCaps_400Regular",
    SpiritualSciFi = "Megrim_400Regular",
}

export function bioFont2Name(font: BioFontsEnum): string {
    switch (font) {
        case BioFontsEnum.Default:
            return "Default";
        case BioFontsEnum.WhenTypewriters:
            return "Grandpa's Typewriter";
        case BioFontsEnum.Lemonade:
            return "Lemonade in the Sun Room";
        case BioFontsEnum.OnceUponATime:
            return "Once upon a time...";
        case BioFontsEnum.Novel:
            return "Novel on a Cloudy Day";
        case BioFontsEnum.DearDiary:
            return "Dear Diary";
        case BioFontsEnum.MissionBriefing:
            return "Mission Briefing";
        case BioFontsEnum.MidsummerFantasy:
            return "Midsummer Fantasy";
        case BioFontsEnum.SpiritualSciFi:
            return "Spiritual Sci-Fi";
    }
}

export enum BioColors {
    Default,
    DarkForest,
    AllHail,
    FadingEmbers,
    BloodStain,
    FormerGlory,
    HeartOfTheSea,
}

export function bioColorToStyle(color: BioColors): StyleProp<TextStyle> {
    switch (color) {
        case BioColors.Default:
            return {
                color: palette.hardGray,
            };
        case BioColors.DarkForest:
            return {
                color: palette.darkForestGreen,
            };
        case BioColors.AllHail:
            return {
                color: palette.royalty,
            };
        case BioColors.FadingEmbers:
            return {
                color: palette.pumpkin,
            };
        case BioColors.BloodStain:
            return {
                color: palette.bloodStain,
            };
        case BioColors.FormerGlory:
            return {
                color: palette.formerGlory,
            };
        case BioColors.HeartOfTheSea:
            return {
                color: palette.heartOfTheSea,
            };
    }
}

export function bioColor2Name(color: BioColors): string {
    switch (color) {
        case BioColors.Default:
            return "Default";
        case BioColors.DarkForest:
            return "The Dark Forest";
        case BioColors.AllHail:
            return "All Hail the King";
        case BioColors.FadingEmbers:
            return "Fading Embers";
        case BioColors.BloodStain:
            return "Blood Stain";
        case BioColors.FormerGlory:
            return "Former Glory";
        case BioColors.HeartOfTheSea:
            return "Heart of the Sea";
    }
}

export enum ProfileStickers {
    Default,
}
