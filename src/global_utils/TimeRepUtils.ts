const millisInSecond = 1000;
const millisIn10Seconds = 10 * millisInSecond;
const millisInMinute = millisInSecond * 60;
const millisIn10Minutes = 10 * millisInMinute;
const millisInHour = millisInMinute * 60;
const millisInDay = millisInHour * 24;
const millisInMonth = millisInDay * 30;
const millisInYear = millisInDay * 365;

export function millisToRep(millis: number): string {
    if (millis > millisInYear) {
        return Math.floor(millis / millisInYear) + "y";
    } else if (millis > millisInMonth) {
        return Math.floor(millis / millisInMonth) + "mth";
    } else if (millis > millisInDay) {
        return Math.floor(millis / millisInDay) + "d";
    } else if (millis > millisInHour) {
        return Math.floor(millis / millisInHour) + "h";
    } else if (millis > millisIn10Minutes) {
        return Math.floor(millis / millisIn10Minutes) * 10 + "m";
    } else if (millis > millisInMinute) {
        return Math.floor(millis / millisInMinute) + "m";
    } else if (millis > millisIn10Seconds) {
        return Math.floor(millisIn10Seconds) * 10 + "s";
    } else {
        return Math.floor(millis / millisInSecond) + "s";
    }
}
