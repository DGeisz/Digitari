import { gql } from "@apollo/client";
import { BioFontsEnum } from "../../../../../../../global_types/ShopTypes";

export const BUY_BIO_FONT = gql`
    mutation BuyBioFont($font: Int!) {
        buyBioFont(font: $font)
    }
`;

export interface BuyBioFontData {
    buyBioFont: BioFontsEnum;
}

export interface BuyBioFontsVariables {
    font: BioFontsEnum;
}

export const SELECT_BIO_FONT = gql`
    mutation SelectBioFont($font: Int!) {
        selectBioFont(font: $font)
    }
`;

export interface SelectBioFontData {
    selectBioFont: BioFontsEnum;
}

export interface SelectBioFontVariables {
    font: BioFontsEnum;
}
