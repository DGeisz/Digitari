export const USER_TYPENAME = "User";

export const FOLLOW_USER_PRICE = 200;
export const DIGIBOLT_PRICE = 10;

export const MAX_BIO_LENGTH = 200;
export const MAX_BIO_LINK_LENGTH = 1000;

export interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    remainingInvites: number;

    newUser?: boolean;

    amFollowing: boolean;

    bio: string;
    link: string;
    ranking: number;
    blocked: number;
    beenBlocked: number;
    coin: number;
    bolts: number;
    imgUrl?: string;

    nameFont: NameFontsEnum;
    nameColor: ProfileColors;
    bioFont: NameFonts;
    bioColor: ProfileColors;
    profileSticker: ProfileStickers;

    lastCollectionTime: string;

    newConvoUpdate: boolean;
    newTransactionUpdate: boolean;

    challengeReceipts: string[];

    coinSpent: number;

    // Challenge fields
    receivedFromConvos: number;
    rfcChallengeIndex: number;

    spentOnConvos: number;
    socChallengeIndex: number;

    successfulConvos: number;
    scChallengeIndex: number;

    postCount: number;
    pcChallengeIndex: number;

    followers: number;
    followersChallengeIndex: number;

    following: number;
    followingChallengeIndex: number;

    communityFollowersChallengeIndex: number;
    maxCommunityFollowers: number;
}

export enum NameFontsEnum {
    Default,
    LetterJacket,
    Galaxy9000,
    HowdyPartner,
    FreshmanDorm,
    ImAPrincess,
    Ole,
    CheapHalloweenParty,
    PassinNotes,
    Yuck,
    OldTyme,
    Arcade,
    GirlyGirl,
    RollerSkateDate,
    WhamBamKablam,
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
    FreshmanDorm = "Codystar_400Regular",
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

//         case NameFonts.OldTyme:
//             return "Old Tyme";
//         case NameFonts.Arcade:
//             return "80s Arcade";
//         case NameFonts.GirlyGirl:
//             return "Girly Girl";
//         case NameFonts.RollerSkateDate:
//             return "Roller Skate Date";
//         case NameFonts.WhamBamKablam:
//             return "Wham! Bam! Kablam!";
//         case NameFonts.Zoom:
//             return "Zooooom!";
//         case NameFonts.ZeusRevenge:
//             return "Zeus' Revenge";
//         case NameFonts.YuletideBall:
//             return "Yuletide Ball";
//         case NameFonts.GreatGatsby:
//             return "Great frikin' Gatsby";
//     }
// }

export enum ProfileColors {
    Default,
}

export enum ProfileStickers {
    Default,
}
