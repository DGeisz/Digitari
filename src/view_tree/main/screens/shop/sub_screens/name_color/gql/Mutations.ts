import { gql } from "@apollo/client";
import { ProfileColors } from "../../../../../../../global_types/ShopTypes";

export const BUY_NAME_COLOR = gql`
    mutation BuyNameColor($color: Int!) {
        buyNameColor(color: $color)
    }
`;

export interface BuyNameColorData {
    buyNameColor: ProfileColors;
}

export interface BuyNameColorsVariables {
    color: ProfileColors;
}

export const SELECT_NAME_COLOR = gql`
    mutation SelectNameColor($color: Int!) {
        selectNameColor(color: $color)
    }
`;

export interface SelectNameColorDate {
    selectNameColor: ProfileColors;
}

export interface SelectNameColorVariables {
    color: ProfileColors;
}
