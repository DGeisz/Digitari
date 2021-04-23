export enum TierEnum {
    AngryHorns = -3,
    Steam,
    Frowning,
    SlightlySmiling,
    Smiling,
    Grinning,
    Hugging,
    Sunglasses,
    HeartEyes,
    Angel,
}

export const TierEmoji = {
    AngryHorns: "👿",
    Steam: "😤",
    Frowning: "🙁",
    SlightlySmiling: "🙂",
    Smiling: "😊",
    Grinning: "😃",
    Hugging: "🤗",
    Sunglasses: "😎",
    HeartEyes: "😍",
    Angel: "😇",
};

export function ranking2Tier(ranking: number): TierEnum {
    if (ranking > 100) {
        return TierEnum.Angel;
    } else if (ranking > 70) {
        return TierEnum.HeartEyes;
    } else if (ranking > 50) {
        return TierEnum.Sunglasses;
    } else if (ranking > 35) {
        return TierEnum.Hugging;
    } else if (ranking > 20) {
        return TierEnum.Grinning;
    } else if (ranking > 5) {
        return TierEnum.Smiling;
    } else if (ranking > -5) {
        return TierEnum.SlightlySmiling;
    } else if (ranking > -10) {
        return TierEnum.Frowning;
    } else if (ranking > -20) {
        return TierEnum.Steam;
    } else {
        return TierEnum.AngryHorns;
    }
}

export function tier2Emoji(tier: TierEnum): string {
    switch (tier) {
        case TierEnum.AngryHorns:
            return TierEmoji.AngryHorns;
        case TierEnum.Steam:
            return TierEmoji.Steam;
        case TierEnum.Frowning:
            return TierEmoji.Frowning;
        case TierEnum.SlightlySmiling:
            return TierEmoji.SlightlySmiling;
        case TierEnum.Smiling:
            return TierEmoji.Smiling;
        case TierEnum.Grinning:
            return TierEmoji.Grinning;
        case TierEnum.Hugging:
            return TierEmoji.Hugging;
        case TierEnum.Sunglasses:
            return TierEmoji.Sunglasses;
        case TierEnum.HeartEyes:
            return TierEmoji.HeartEyes;
        case TierEnum.Angel:
            return TierEmoji.Angel;
    }
}
