import { StackNavigationProp } from "@react-navigation/stack";

export type TabNavTab = {
    MainFeed: undefined | { screen: string };
    Convos: undefined;
    Search: undefined;
    Wallet: undefined;
    Profile: undefined | { screen: string };
};

/*
 * Nav props
 */
export type WalletNavProp = StackNavigationProp<TabNavTab, "Wallet">;
export type ConvosNavProp = StackNavigationProp<TabNavTab, "Convos">;
export type MainFeedNavProp = StackNavigationProp<TabNavTab, "MainFeed">;
export type ProfileNavProp = StackNavigationProp<TabNavTab, "Profile">;
export type SearchNavProp = StackNavigationProp<TabNavTab, "Search">;
