export function capitalizeWord(
    word: string,
    locale = navigator.language
): string {
    if (!word) {
        return "";
    } else {
        return word[0].toLocaleUpperCase(locale) + word.substring(1);
    }
}

export function filterEmoji(text: string): string {
    return text.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "");
}

export const DOUBLE_NEWLINE = "\n\n";

export function stripUrlScheme(url: string): string {
    return url.replace(/(^\w+:|^)\/\//, "");
}
