import { StackNavigationProp } from "@react-navigation/stack";

export type TabNavTab = {
    MainFeed: undefined;
    Convos: undefined;
    Search: undefined;
    Wallet: undefined;
    Profile: undefined;
};

/*
 * Nav props
 */
export type WalletNavProp = StackNavigationProp<TabNavTab, "Wallet">;
export type ConvosNavProp = StackNavigationProp<TabNavTab, "Convos">;
