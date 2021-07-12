import { gql } from "@apollo/client";
import { BioColors } from "../../../../../../../global_types/ShopTypes";

export const BUY_BIO_COLOR = gql`
    mutation BuyBioColor($color: Int!) {
        buyBioColor(color: $color)
    }
`;

export interface BuyBioColorData {
    buyBioColor: BioColors;
}

export interface BuyBioColorVariables {
    color: BioColors;
}

export const SELECT_BIO_COLOR = gql`
    mutation SelectBioColor($color: Int!) {
        selectBioColor(color: $color)
    }
`;

export interface SelectBioColorData {
    selectBioColor: BioColors;
}

export interface SelectBioColorVariables {
    color: BioColors;
}
