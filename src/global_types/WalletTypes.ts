import { millisIn10Minutes } from "../global_utils/TimeRepUtils";
import { walletEntryExample, WalletEntryType } from "./WalletEntryTypes";

export interface WalletType {
    id: string;
    sum: number;
    expirationTime: number;
    entries: WalletEntryType[];
}

export interface GWalletType extends WalletType {
    __typename: string;
}

export const exampleWallet: WalletType = {
    id: "yote",
    sum: 345,
    expirationTime: Date.now() + millisIn10Minutes,
    entries: [walletEntryExample, walletEntryExample, walletEntryExample],
};

export const gExampleWallet: GWalletType = Object.assign({}, exampleWallet, {
    __typename: "Wallet",
});
