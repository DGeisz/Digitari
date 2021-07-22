import { StyleProp, TextStyle } from "react-native";
import { palette } from "../global_styles/Palette";

export interface ItemRequirement {
    ranking?: number;
    level?: number;
}

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

export function nameFontPrice(font: NameFontsEnum): number {
    switch (font) {
        case NameFontsEnum.Default:
            return 0;
        case NameFontsEnum.LetterJacket:
            return 30;
        case NameFontsEnum.Galaxy9000:
            return 50;
        case NameFontsEnum.HowdyPartner:
            return 75;
        case NameFontsEnum.ImAPrincess:
            return 125;
        case NameFontsEnum.Ole:
            return 200;
        case NameFontsEnum.CheapHalloweenParty:
            return 300;
        case NameFontsEnum.PassinNotes:
            return 500;
        case NameFontsEnum.Yuck:
            return 750;
        case NameFontsEnum.OldTyme:
            return 1200;
        case NameFontsEnum.Arcade:
            return 2000;
        case NameFontsEnum.GirlyGirl:
            return 3000;
        case NameFontsEnum.WhamBamKablam:
            return 5000;
        case NameFontsEnum.RollerSkateDate:
            return 7500;
        case NameFontsEnum.Zoom:
            return 12500;
        case NameFontsEnum.ZeusRevenge:
            return 20000;
        case NameFontsEnum.YuletideBall:
            return 30000;
        case NameFontsEnum.GreatGatsby:
            return 50000;
    }
}

export function nameFontRequirement(font: NameFontsEnum): ItemRequirement {
    switch (font) {
        case NameFontsEnum.Default:
            return {};
        case NameFontsEnum.LetterJacket:
            return {};
        case NameFontsEnum.Galaxy9000:
            return {};
        case NameFontsEnum.HowdyPartner:
            return {
                level: 15,
            };
        case NameFontsEnum.ImAPrincess:
            return {
                level: 20,
            };
        case NameFontsEnum.Ole:
            return {
                ranking: 5,
            };
        case NameFontsEnum.CheapHalloweenParty:
            return {
                level: 30,
            };
        case NameFontsEnum.PassinNotes:
            return {
                level: 35,
            };
        case NameFontsEnum.Yuck:
            return {
                ranking: 12,
            };
        case NameFontsEnum.OldTyme:
            return {
                level: 45,
            };
        case NameFontsEnum.Arcade:
            return {
                level: 50,
            };
        case NameFontsEnum.GirlyGirl:
            return {
                ranking: 25,
            };
        case NameFontsEnum.WhamBamKablam:
            return {
                level: 60,
            };
        case NameFontsEnum.RollerSkateDate:
            return {
                level: 65,
            };
        case NameFontsEnum.Zoom:
            return {
                ranking: 75,
            };
        case NameFontsEnum.ZeusRevenge:
            return {
                level: 85,
            };
        case NameFontsEnum.YuletideBall:
            return {
                level: 95,
            };
        case NameFontsEnum.GreatGatsby:
            return {
                ranking: 250,
            };
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
            return "Alaskan Sockeye";
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

export function nameColorPrice(color: ProfileColors): number {
    switch (color) {
        case ProfileColors.Default:
            return 0;
        case ProfileColors.BloodStain:
            return 20;
        case ProfileColors.Stop:
            return 30;
        case ProfileColors.LastSunset:
            return 50;
        case ProfileColors.PlasticDollhouse:
            return 80;
        case ProfileColors.AlaskanSockeye:
            return 125;
        case ProfileColors.DarkForest:
            return 200;
        case ProfileColors.AboveTreeline:
            return 300;
        case ProfileColors.CrackinGlowSticks:
            return 500;
        case ProfileColors.AllHail:
            return 900;
        case ProfileColors.BlacklitRave:
            return 1500;
        case ProfileColors.FirstTeaParty:
            return 2500;
        case ProfileColors.MadeThePodium:
            return 4000;
        case ProfileColors.SoClose:
            return 6000;
        case ProfileColors.ChampionOfTheWorld:
            return 10000;
    }
}

export function nameColorRequirement(color: ProfileColors): ItemRequirement {
    switch (color) {
        case ProfileColors.Default:
            return {};
        case ProfileColors.BloodStain:
            return {};
        case ProfileColors.Stop:
            return {};
        case ProfileColors.LastSunset:
            return {
                level: 15,
            };
        case ProfileColors.PlasticDollhouse:
            return {
                level: 20,
            };
        case ProfileColors.AlaskanSockeye:
            return {
                ranking: 5,
            };
        case ProfileColors.DarkForest:
            return {
                level: 25,
            };
        case ProfileColors.AboveTreeline:
            return {
                level: 30,
            };
        case ProfileColors.CrackinGlowSticks:
            return {
                ranking: 10,
            };
        case ProfileColors.AllHail:
            return {
                level: 40,
            };
        case ProfileColors.BlacklitRave:
            return {
                level: 45,
            };
        case ProfileColors.FirstTeaParty:
            return {
                ranking: 30,
            };
        case ProfileColors.MadeThePodium:
            return {
                level: 55,
            };
        case ProfileColors.SoClose:
            return {
                level: 60,
            };
        case ProfileColors.ChampionOfTheWorld:
            return {
                ranking: 70,
            };
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

export function bioFontPrice(font: BioFontsEnum): number {
    switch (font) {
        case BioFontsEnum.Default:
            return 0;
        case BioFontsEnum.DearDiary:
            return 30;
        case BioFontsEnum.Lemonade:
            return 60;
        case BioFontsEnum.OnceUponATime:
            return 120;
        case BioFontsEnum.Novel:
            return 250;
        case BioFontsEnum.WhenTypewriters:
            return 500;
        case BioFontsEnum.MissionBriefing:
            return 1200;
        case BioFontsEnum.MidsummerFantasy:
            return 2500;
        case BioFontsEnum.SpiritualSciFi:
            return 5000;
    }
}

export function bioFontRequirement(font: BioFontsEnum): ItemRequirement {
    switch (font) {
        case BioFontsEnum.Default:
            return {};
        case BioFontsEnum.DearDiary:
            return {};
        case BioFontsEnum.Lemonade:
            return {};
        case BioFontsEnum.OnceUponATime:
            return {
                level: 20,
            };
        case BioFontsEnum.Novel:
            return {
                level: 30,
            };
        case BioFontsEnum.WhenTypewriters:
            return {
                ranking: 5,
            };
        case BioFontsEnum.MissionBriefing:
            return {
                level: 45,
            };
        case BioFontsEnum.MidsummerFantasy:
            return {
                level: 55,
            };
        case BioFontsEnum.SpiritualSciFi:
            return {
                ranking: 40,
            };
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

export function bioColorPrice(color: BioColors): number {
    switch (color) {
        case BioColors.Default:
            return 0;
        case BioColors.DarkForest:
            return 30;
        case BioColors.AllHail:
            return 80;
        case BioColors.FadingEmbers:
            return 200;
        case BioColors.BloodStain:
            return 500;
        case BioColors.FormerGlory:
            return 1500;
        case BioColors.HeartOfTheSea:
            return 4000;
    }
}

export function bioColorRequirement(color: BioColors): ItemRequirement {
    switch (color) {
        case BioColors.Default:
            return {};
        case BioColors.DarkForest:
            return {};
        case BioColors.AllHail:
            return {};
        case BioColors.FadingEmbers:
            return {
                level: 25,
            };
        case BioColors.BloodStain:
            return {
                level: 35,
            };
        case BioColors.FormerGlory:
            return {
                ranking: 20,
            };
        case BioColors.HeartOfTheSea:
            return {
                level: 60,
            };
    }
}

export enum ProfileStickers {
    Default,
    Ghost,
    CrossBones,
    DrumStick,
    Football,
    Brain,
    HatWithBow,
    Scorpion,
    Snowflake,
    Saxophone,
    TRex,
    Teddy,
    Poop,
    Alien,
    Salsa,
    Gains,
    BaldEagle,
    Soccer,
    HappySad,
    Fire,
    Violin,
    RaceCar,
    Microscope,
    CrossSwords,
    Rocket,
    Champagne,
    StarMedal,
}

export function stickerToName(sticker: ProfileStickers): string {
    switch (sticker) {
        case ProfileStickers.Default:
            return "Default";
        case ProfileStickers.Ghost:
            return "#boo";
        case ProfileStickers.CrossBones:
            return "Ahoy Matey!";
        case ProfileStickers.DrumStick:
            return "*snarf*";
        case ProfileStickers.Football:
            return "Touchdown!";
        case ProfileStickers.Brain:
            return "Big Brain";
        case ProfileStickers.HatWithBow:
            return "Day at the Fair";
        case ProfileStickers.Scorpion:
            return "Back off";
        case ProfileStickers.Snowflake:
            return "Beautiful & Icy";
        case ProfileStickers.Saxophone:
            return "Jazz, baby";
        case ProfileStickers.TRex:
            return "rawr";
        case ProfileStickers.Teddy:
            return "Childhood Nostalgia";
        case ProfileStickers.Poop:
            return "hehe";
        case ProfileStickers.Alien:
            return "Take me to your leader";
        case ProfileStickers.Salsa:
            return "¡Bravo!";
        case ProfileStickers.Gains:
            return "GAINZ";
        case ProfileStickers.BaldEagle:
            return "Good lookin' Bird";
        case ProfileStickers.Soccer:
            return "Gooooooooooooooooal!";
        case ProfileStickers.HappySad:
            return "Break a Leg!";
        case ProfileStickers.Fire:
            return "You on fire, baby";
        case ProfileStickers.Violin:
            return "Refined tastes";
        case ProfileStickers.RaceCar:
            return "In the Fast Lane";
        case ProfileStickers.Microscope:
            return "New Frontiers";
        case ProfileStickers.CrossSwords:
            return "On Guard!";
        case ProfileStickers.Rocket:
            return "Among the Stars";
        case ProfileStickers.Champagne:
            return "To a Brighter Tomorrow";
        case ProfileStickers.StarMedal:
            return "Ain't no Participation Medal";
    }
}

export function stickerToEmoji(sticker: ProfileStickers): string {
    switch (sticker) {
        case ProfileStickers.Default:
            return "";
        case ProfileStickers.Ghost:
            return "👻";
        case ProfileStickers.CrossBones:
            return "☠";
        case ProfileStickers.DrumStick:
            return "🍗";
        case ProfileStickers.Football:
            return "🏈";
        case ProfileStickers.Brain:
            return "🧠";
        case ProfileStickers.HatWithBow:
            return "👒";
        case ProfileStickers.Scorpion:
            return "🦂";
        case ProfileStickers.Snowflake:
            return "❄";
        case ProfileStickers.Saxophone:
            return "🎷";
        case ProfileStickers.TRex:
            return "🦖";
        case ProfileStickers.Teddy:
            return "🧸";
        case ProfileStickers.Poop:
            return "💩";
        case ProfileStickers.Alien:
            return "👽";
        case ProfileStickers.Salsa:
            return "💃";
        case ProfileStickers.Gains:
            return "💪";
        case ProfileStickers.BaldEagle:
            return "🦅";
        case ProfileStickers.Soccer:
            return "⚽";
        case ProfileStickers.HappySad:
            return "🎭";
        case ProfileStickers.Fire:
            return "🔥";
        case ProfileStickers.Violin:
            return "🎻";
        case ProfileStickers.RaceCar:
            return "🏎️";
        case ProfileStickers.Microscope:
            return "🔬";
        case ProfileStickers.CrossSwords:
            return "⚔";
        case ProfileStickers.Rocket:
            return "🚀";
        case ProfileStickers.Champagne:
            return "🍾";
        case ProfileStickers.StarMedal:
            return "🏅";
    }
}

export function stickerPrice(sticker: ProfileStickers): number {
    switch (sticker) {
        case ProfileStickers.Default:
            return 0;
        case ProfileStickers.Ghost:
            return 20;
        case ProfileStickers.CrossBones:
            return 30;
        case ProfileStickers.DrumStick:
            return 40;
        case ProfileStickers.Football:
            return 60;
        case ProfileStickers.Brain:
            return 80;
        case ProfileStickers.HatWithBow:
            return 100;
        case ProfileStickers.Scorpion:
            return 150;
        case ProfileStickers.Snowflake:
            return 200;
        case ProfileStickers.Saxophone:
            return 300;
        case ProfileStickers.TRex:
            return 400;
        case ProfileStickers.Teddy:
            return 600;
        case ProfileStickers.Poop:
            return 850;
        case ProfileStickers.Alien:
            return 1200;
        case ProfileStickers.Salsa:
            return 1600;
        case ProfileStickers.Gains:
            return 2300;
        case ProfileStickers.BaldEagle:
            return 3300;
        case ProfileStickers.Soccer:
            return 4600;
        case ProfileStickers.HappySad:
            return 6500;
        case ProfileStickers.Fire:
            return 9000;
        case ProfileStickers.Violin:
            return 13000;
        case ProfileStickers.RaceCar:
            return 18000;
        case ProfileStickers.Microscope:
            return 25000;
        case ProfileStickers.CrossSwords:
            return 35000;
        case ProfileStickers.Rocket:
            return 50000;
        case ProfileStickers.Champagne:
            return 70000;
        case ProfileStickers.StarMedal:
            return 100000;
    }
}

export function stickerRequirement(sticker: ProfileStickers): ItemRequirement {
    switch (sticker) {
        case ProfileStickers.Default:
            return {};
        case ProfileStickers.Ghost:
            return {};
        case ProfileStickers.CrossBones:
            return {};
        case ProfileStickers.DrumStick:
            return {
                level: 10,
            };
        case ProfileStickers.Football:
            return {
                level: 15,
            };
        case ProfileStickers.Brain:
            return {
                ranking: 2,
            };
        case ProfileStickers.HatWithBow:
            return {
                level: 20,
            };
        case ProfileStickers.Scorpion:
            return {
                level: 25,
            };
        case ProfileStickers.Snowflake:
            return {
                ranking: 5,
            };
        case ProfileStickers.Saxophone:
            return {
                level: 30,
            };
        case ProfileStickers.TRex:
            return {
                level: 35,
            };
        case ProfileStickers.Teddy:
            return {
                ranking: 10,
            };
        case ProfileStickers.Poop:
            return {
                level: 40,
            };
        case ProfileStickers.Alien:
            return {
                level: 45,
            };
        case ProfileStickers.Salsa:
            return {
                ranking: 20,
            };
        case ProfileStickers.Gains:
            return {
                level: 50,
            };
        case ProfileStickers.BaldEagle:
            return {
                level: 55,
            };
        case ProfileStickers.Soccer:
            return {
                ranking: 45,
            };
        case ProfileStickers.HappySad:
            return {
                level: 65,
            };
        case ProfileStickers.Fire:
            return {
                level: 70,
            };
        case ProfileStickers.Violin:
            return {
                ranking: 80,
            };
        case ProfileStickers.RaceCar:
            return {
                level: 80,
            };
        case ProfileStickers.Microscope:
            return {
                level: 90,
            };
        case ProfileStickers.CrossSwords:
            return {
                ranking: 175,
            };
        case ProfileStickers.Rocket:
            return {
                level: 110,
            };
        case ProfileStickers.Champagne:
            return {
                level: 120,
            };
        case ProfileStickers.StarMedal:
            return {
                ranking: 500,
            };
    }
}
