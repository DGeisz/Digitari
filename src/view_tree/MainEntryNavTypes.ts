import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MainEntryStack = {
    TabNav: undefined;
    Convo: {
        cid: string;
        popToTop?: boolean;
    };
    NewPost: undefined;
    PostScreen: {
        pid: string;
    };
    AccountSettings: undefined;
};

/**
 * Nav props
 */
export type TabNavProp = StackNavigationProp<MainEntryStack, "TabNav">;
export type PostScreenNavProp = StackNavigationProp<
    MainEntryStack,
    "PostScreen"
>;

/**
 * Route props
 */
export type PostScreenRouteProp = RouteProp<MainEntryStack, "PostScreen">;
export type ConvoRouteProp = RouteProp<MainEntryStack, "Convo">;
