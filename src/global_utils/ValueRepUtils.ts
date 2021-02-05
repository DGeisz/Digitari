/**
 * Takes a number and returns a 3 digit representation of the number, ie 2.4mil 3.2k
 */
export function toRep(val: number) {
    if (val < 1000) {
        return val;
    } else if (val < 100_000) {
        return (val / 1000).toFixed(1) + "k";
    } else if (val < 1_000_000) {
        return (val / 1000).toFixed(0) + "k";
    } else if (val < 100_000_000) {
        return (val / 1_000_000).toFixed(1) + "m";
    } else if (val < 1_000_000_000) {
        return (val / 1_000_000).toFixed(0) + "m";
    }
    return (val / 1_000_000_000).toFixed(1) + "b";
}
