import { gql } from "@apollo/client";
import { NameFontsEnum } from "../../../../../../../global_types/ShopTypes";

export const BUY_NAME_FONT = gql`
    mutation BuyNameFont($font: Int!) {
        buyNameFont(font: $font)
    }
`;

export interface BuyNameFontData {
    buyNameFont: NameFontsEnum;
}

export interface BuyNameFontVariables {
    font: NameFontsEnum;
}

export const SELECT_NAME_FONT = gql`
    mutation SelectNameFont($font: Int!) {
        selectNameFont(font: $font)
    }
`;

export interface SelectNameFontData {
    selectNameFont: NameFontsEnum;
}

export interface SelectNameFontVariables {
    font: NameFontsEnum;
}
