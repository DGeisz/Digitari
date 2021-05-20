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
