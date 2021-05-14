/**
 * First return is the level,
 * second return is the adjusted goal for the next level,
 * third return is the progress towards the next goal
 */
export function calculateLevelInfo(
    coinSpent: number
): [number, number, number] {
    let level = 0;
    let levelBase = 0;
    let nextGoal = 10;

    let goalSize = 10;

    let goalAccumulation = 10;

    while (true) {
        if (coinSpent < nextGoal) {
            return [level, nextGoal - levelBase, coinSpent - levelBase];
        }

        level++;
        levelBase = nextGoal;
        nextGoal += goalSize;
        goalSize += goalAccumulation;

        if (level === 10) {
            goalAccumulation = 20;
        } else if (level === 20) {
            goalAccumulation = 50;
        } else if (level === 30) {
            goalAccumulation = 100;
        } else if (level === 40) {
            goalAccumulation = 200;
        } else if (level === 50) {
            goalAccumulation = 500;
        } else if (level === 100) {
            goalAccumulation = 1000;
        }
    }
}
