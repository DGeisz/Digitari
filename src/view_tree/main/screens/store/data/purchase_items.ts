import { IAPItemDetails, IAPItemType } from "expo-in-app-purchases";

export const purchaseItems: IAPItemDetails[] = [
    {
        productId: "coin0",
        title: "pinch",
        description: "1,500 Digicoins",
        price: "$0.99",
        priceAmountMicros: 990000,
        priceCurrencyCode: "USD",
        type: 0,
    },
    {
        productId: "coin1",
        title: "handful",
        description: "8,000 Digicoins",
        price: "$4.99",
        priceAmountMicros: 4990000,
        priceCurrencyCode: "USD",
        type: 0,
    },
    {
        productId: "coin2",
        title: "bag",
        description: "17,000 Digicoins",
        price: "$9.99",
        priceAmountMicros: 9990000,
        priceCurrencyCode: "USD",
        type: 0,
    },
    {
        productId: "coin3",
        title: "chest",
        description: "35,000 Digicoins",
        price: "$19.99",
        priceAmountMicros: 19990000,
        priceCurrencyCode: "USD",
        type: 0,
    },
    {
        productId: "coin4",
        title: "barrel",
        description: "90,000 Digicoins",
        price: "$49.99",
        priceAmountMicros: 49990000,
        priceCurrencyCode: "USD",
        type: 0,
    },
    {
        productId: "coin5",
        title: "truckload",
        description: "200,000 Digicoins",
        price: "$99.99",
        priceAmountMicros: 99990000,
        priceCurrencyCode: "USD",
        type: 0,
    },
];

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
