const millisInSecond = 1000;
const millisIn10Seconds = 10 * millisInSecond;
const millisInMinute = millisInSecond * 60;
export const millisIn10Minutes = 10 * millisInMinute;
export const millisInHour = millisInMinute * 60;
export const millisInDay = millisInHour * 24;
const millisInWeek = millisInDay * 7;
const millisInMonth = millisInDay * 30;
const millisInYear = millisInDay * 365;

export function millisToRep(millis: number): string {
    if (millis > millisInYear) {
        return Math.floor(millis / millisInYear) + "y";
    } else if (millis > millisInMonth) {
        return Math.floor(millis / millisInMonth) + "mo";
    } else if (millis > millisInWeek) {
        return Math.floor(millis / millisInWeek) + "w";
    } else if (millis > millisInDay) {
        return Math.floor(millis / millisInDay) + "d";
    } else if (millis > millisInHour) {
        return Math.floor(millis / millisInHour) + "h";
    } else if (millis > millisInMinute) {
        return Math.floor(millis / millisInMinute) + "m";
    } else if (millis > millisIn10Seconds) {
        return Math.floor(millis / millisIn10Seconds) * 10 + "s";
    } else {
        return Math.floor(millis / millisInSecond) + "s";
    }
}

export function millisToCountdown(millis: number): string {
    const hours = Math.floor(millis / millisInHour);
    millis -= hours * millisInHour;
    const min = Math.floor(millis / millisInMinute);
    millis -= min * millisInMinute;
    const sec = Math.floor(millis / millisInSecond);

    const minZero = min < 10 ? "0" : "";
    const secZero = sec < 10 ? "0" : "";

    if (!!hours) {
        return `${hours}:${minZero}${min}:${secZero}${sec}`;
    } else if (!!min) {
        return `${min}:${secZero}${sec}`;
    }

    return `${sec}`;
}

/**
 * Takes in a epoch time and returns
 * a human readable version of it,
 * relative to the current date
 */
export const dateFormatter = (epochTimeString: string) => {
    const epochTime = parseInt(epochTimeString);
    const date = new Date(epochTime);
    const diff = Date.now() - epochTime;
    const diffDays = diff / (1000 * 3600 * 24);
    const diffHours = diff / (1000 * 3600);
    if (diffDays < 6) {
        let hours = date.getHours();
        let minutes = date.getMinutes().toString();
        let ampm = hours >= 12 ? "PM" : "AM";
        let finalHours = hours % 12;
        finalHours = finalHours ? finalHours : 12; // the hour '0' should be '12'
        minutes = parseInt(minutes) < 10 ? "0" + minutes : minutes;
        if (diffHours < hours) {
            return finalHours + ":" + minutes + " " + ampm;
        }
        return days[date.getDay()];
    }
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
