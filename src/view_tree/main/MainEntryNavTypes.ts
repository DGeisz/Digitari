import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MainEntryStack = {
    TabNav: undefined;
    Convo: {
        cid: string;
    };
    NewResponse: {
        tname: string;
        pid: string;
        responseCost: number;
    };
    PostScreen: {
        pid: string;
    };
    AccountSettings: undefined;
    NewPost: undefined;
    NewCommunity: undefined;
    Community: {
        cmid: string;
    };
    User: {
        uid: string;
    };
    Follows: {
        uid: string;
        name: string;
    };
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
export type NewCommunityNavProp = StackNavigationProp<
    MainEntryStack,
    "NewCommunity"
>;
export type UserNavProp = StackNavigationProp<MainEntryStack, "User">;
export type FollowsNavProp = StackNavigationProp<MainEntryStack, "Follows">;
export type CommunityNavProp = StackNavigationProp<MainEntryStack, "Community">;
export type NewPostNavProp = StackNavigationProp<MainEntryStack, "NewPost">;

/**
 * Route props
 */
export type PostScreenRouteProp = RouteProp<MainEntryStack, "PostScreen">;
export type ConvoRouteProp = RouteProp<MainEntryStack, "Convo">;
export type NewResponseRouteProp = RouteProp<MainEntryStack, "NewResponse">;
export type CommunityRouteProp = RouteProp<MainEntryStack, "Community">;
export type UserRouteProp = RouteProp<MainEntryStack, "User">;
export type FollowsRouteProp = RouteProp<MainEntryStack, "Follows">;
