/**
 * Takes a number and returns a 3 digit representation of the number, ie 2.4mil 3.2k
 */
export function toRep(val: number) {
    if (val < 1000) {
        return val;
    } else if (val < 100000) {
        return (val / 1000).toFixed(1) + "k";
    } else if (val < 1000000) {
        return (val / 1000).toFixed(0) + "k";
    }
    return (val / 1000000).toFixed(1) + "m";
}
