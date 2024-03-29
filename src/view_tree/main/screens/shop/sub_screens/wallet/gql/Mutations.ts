import { gql } from "@apollo/client";
import { UserType } from "../../../../../../../global_types/UserTypes";

export const BOOST_WALLET = gql`
    mutation BoostWallet {
        boostWallet
    }
`;

export interface BoostWalletData {
    boostWallet: boolean;
}

export interface BoostWalletVariables {}

export const UPGRADE_WALLET = gql`
    mutation UpgradeWallet {
        upgradeWallet {
            id
            bolts
            maxWallet
        }
    }
`;

export interface UpgradeWalletData {
    upgradeWallet: UserType;
}

export interface UpgradeWalletVariables {}

export const UPGRADE_BOLT_WALLET = gql`
    mutation UpgradeBoltWallet {
        upgradeBoltWallet {
            id
            bolts
            maxBoltWallet
        }
    }
`;

export interface UpgradeBoltWalletData {
    upgradeBoltWallet: UserType;
}

export interface UpgradeBoltWalletVariables {}
