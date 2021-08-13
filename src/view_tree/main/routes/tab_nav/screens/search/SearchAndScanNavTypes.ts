import { StackNavigationProp } from "@react-navigation/stack";

export type SearchAndScanNavType = {
    Search: undefined;
    Scan: undefined;
};

export type SearchNavProp = StackNavigationProp<SearchAndScanNavType, "Search">;
export type ScanNavProp = StackNavigationProp<SearchAndScanNavType, "Scan">;
