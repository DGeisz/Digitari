export function getNextLevelCoinThreshold(coinSpent: number): number {
    return 1000 + 1000 * Math.floor(coinSpent / 1000);
}
