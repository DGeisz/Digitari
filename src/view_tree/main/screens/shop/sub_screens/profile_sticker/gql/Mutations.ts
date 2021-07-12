import { gql } from "@apollo/client";
import { ProfileStickers } from "../../../../../../../global_types/ShopTypes";

export const BUY_STICKER = gql`
    mutation BuySticker($sticker: Int!) {
        buySticker(sticker: $sticker)
    }
`;

export interface BuyStickerData {
    buySticker: ProfileStickers;
}

export interface BuyStickerVariables {
    sticker: ProfileStickers;
}

export const SELECT_STICKER = gql`
    mutation SelectSticker($sticker: Int!) {
        selectSticker(sticker: $sticker)
    }
`;

export interface SelectStickerData {
    selectSticker: ProfileStickers;
}

export interface SelectStickerVariables {
    sticker: ProfileStickers;
}
