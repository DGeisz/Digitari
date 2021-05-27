export function storeTitleTranslation(title: string): string {
    switch (title) {
        case "pinch": {
            return "Pinch o' Coins";
        }
        case "handful": {
            return "Handful o' Coins";
        }
        case "bag": {
            return "Bag o' Coins";
        }
        case "chest": {
            return "Chest o' Coins";
        }
        case "barrel": {
            return "Barrel o' Coins";
        }
        case "truckload": {
            return "Truckload o' Coins";
        }
        default: {
            return "Coins";
        }
    }
}

export function extractCoinAmount(description: string): number {
    const raw = description.split(" ")[0];

    return parseInt(raw.replaceAll(",", ""));
}
