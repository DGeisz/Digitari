import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MainEntryStack = {
    TabNav: undefined;
    Convo: {
        cid: string;
    };
    New: undefined;
    NewResponse: {
        tname: string;
        pid: string;
        responseCost: number;
    };
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
export type NewResponseNavProp = StackNavigationProp<
    MainEntryStack,
    "NewResponse"
>;
export type ConvoNavProp = StackNavigationProp<MainEntryStack, "Convo">;

/**
 * Route props
 */
export type PostScreenRouteProp = RouteProp<MainEntryStack, "PostScreen">;
export type ConvoRouteProp = RouteProp<MainEntryStack, "Convo">;
export type NewResponseRouteProp = RouteProp<MainEntryStack, "NewResponse">;
