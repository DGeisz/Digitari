import { millisInHour } from "../global_utils/TimeRepUtils";

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
    if (ranking >= 100) {
        return TierEnum.Angel;
    } else if (ranking >= 70) {
        return TierEnum.HeartEyes;
    } else if (ranking >= 50) {
        return TierEnum.Sunglasses;
    } else if (ranking >= 35) {
        return TierEnum.Hugging;
    } else if (ranking >= 20) {
        return TierEnum.Grinning;
    } else if (ranking >= 5) {
        return TierEnum.Smiling;
    } else if (ranking >= -5) {
        return TierEnum.SlightlySmiling;
    } else if (ranking >= -10) {
        return TierEnum.Frowning;
    } else if (ranking >= -20) {
        return TierEnum.Steam;
    } else {
        return TierEnum.AngryHorns;
    }
}

export function tier2MinRanking(tier: TierEnum): number {
    switch (tier) {
        case TierEnum.AngryHorns:
            return NaN;
        case TierEnum.Steam:
            return -20;
        case TierEnum.Frowning:
            return -10;
        case TierEnum.SlightlySmiling:
            return -5;
        case TierEnum.Smiling:
            return 5;
        case TierEnum.Grinning:
            return 20;
        case TierEnum.Hugging:
            return 35;
        case TierEnum.Sunglasses:
            return 50;
        case TierEnum.HeartEyes:
            return 70;
        case TierEnum.Angel:
            return 100;
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

export function tier2Wage(tier: TierEnum): [number, number] {
    let dailyWage: number;

    switch (tier) {
        case TierEnum.AngryHorns:
            dailyWage = 10;
            break;
        case TierEnum.Steam:
            dailyWage = 50;
            break;
        case TierEnum.Frowning:
            dailyWage = 200;
            break;
        case TierEnum.SlightlySmiling:
            dailyWage = 400;
            break;
        case TierEnum.Smiling:
            dailyWage = 600;
            break;
        case TierEnum.Grinning:
            dailyWage = 1000;
            break;
        case TierEnum.Hugging:
            dailyWage = 1500;
            break;
        case TierEnum.Sunglasses:
            dailyWage = 2000;
            break;
        case TierEnum.HeartEyes:
            dailyWage = 3000;
            break;
        case TierEnum.Angel:
            dailyWage = 5000;
            break;
    }

    return [dailyWage / 24, dailyWage];
}

/*
 * First return is the hourly wage, second return
 * is the daily wage (max wage)
 */
export function ranking2Wage(ranking: number): [number, number] {
    const tier = ranking2Tier(ranking);

    return tier2Wage(tier);
}

/**
 * First return is the amount of coin generated, second is the daily
 * total
 */
export function getTierWage(
    ranking: number,
    lastCollectionTime: string
): [number, number] {
    const [hourlyWage, dailyWage] = ranking2Wage(ranking);

    return [
        Math.min(
            Math.floor(
                hourlyWage *
                    ((Date.now() - parseInt(lastCollectionTime)) / millisInHour)
            ),
            dailyWage
        ),
        dailyWage,
    ];
}

export function tier2convoReward(tier: TierEnum): number {
    switch (tier) {
        case TierEnum.AngryHorns:
            return 2;
        case TierEnum.Steam:
            return 4;
        case TierEnum.Frowning:
            return 15;
        case TierEnum.SlightlySmiling:
            return 30;
        case TierEnum.Smiling:
            return 45;
        case TierEnum.Grinning:
            return 75;
        case TierEnum.Hugging:
            return 100;
        case TierEnum.Sunglasses:
            return 150;
        case TierEnum.HeartEyes:
            return 250;
        case TierEnum.Angel:
            return 400;
    }
}

export function tier2responseCost(tier: TierEnum): number {
    switch (tier) {
        case TierEnum.AngryHorns:
            return 1;
        case TierEnum.Steam:
            return 2;
        case TierEnum.Frowning:
            return 5;
        case TierEnum.SlightlySmiling:
            return 10;
        case TierEnum.Smiling:
            return 15;
        case TierEnum.Grinning:
            return 25;
        case TierEnum.Hugging:
            return 35;
        case TierEnum.Sunglasses:
            return 50;
        case TierEnum.HeartEyes:
            return 85;
        case TierEnum.Angel:
            return 135;
    }
}
