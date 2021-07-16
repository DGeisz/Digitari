import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MainEntryStack = {
    TabNav:
        | {
              screen?: string;
          }
        | undefined;
    Convo: {
        cvid: string;
        pid: string;
        noAnimation?: boolean;
    };
    NewResponse: {
        tname: string;
        pid: string;
        responseCost: number;
    };
    PostScreen: {
        pid: string;
    };
    NewPost: {
        cmid?: string;
    };
    NewCommunity: undefined;
    Community: {
        cmid: string;
    };
    User: {
        uid: string;
    };
    Shop: { screen: string } | undefined;
    Follows: {
        uid: string;
        name: string;
    };
    ReportPost: {
        pid: string;
    };
    ReportConvo: {
        cvid: string;
    };
    ReportUser: {
        uid: string;
    };
    ReportCommunity: {
        cmid: string;
    };
    Settings: undefined;
    Password: undefined;
    PasswordChanged: undefined;
    DeleteAccount: undefined;
    PrivacyPolicy: undefined;
    TermsAndConditions: undefined;
    Invite: undefined;
    Store: undefined;
};

/*
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
export type ReportPostNavProp = StackNavigationProp<
    MainEntryStack,
    "ReportPost"
>;
export type ReportConvoNavProp = StackNavigationProp<
    MainEntryStack,
    "ReportConvo"
>;
export type ReportUserNavProp = StackNavigationProp<
    MainEntryStack,
    "ReportUser"
>;
export type ReportCommunityNavProp = StackNavigationProp<
    MainEntryStack,
    "ReportCommunity"
>;
export type SettingsNavProp = StackNavigationProp<MainEntryStack, "Settings">;
export type PasswordNavProp = StackNavigationProp<MainEntryStack, "Password">;
export type InvitesNavProp = StackNavigationProp<MainEntryStack, "Invite">;

/*
 * Route props
 */
export type PostScreenRouteProp = RouteProp<MainEntryStack, "PostScreen">;
export type ConvoRouteProp = RouteProp<MainEntryStack, "Convo">;
export type NewResponseRouteProp = RouteProp<MainEntryStack, "NewResponse">;
export type CommunityRouteProp = RouteProp<MainEntryStack, "Community">;
export type UserRouteProp = RouteProp<MainEntryStack, "User">;
export type FollowsRouteProp = RouteProp<MainEntryStack, "Follows">;
export type NewPostRouteProp = RouteProp<MainEntryStack, "NewPost">;
export type ReportPostRouteProp = RouteProp<MainEntryStack, "ReportPost">;
export type ReportConvoRouteProp = RouteProp<MainEntryStack, "ReportConvo">;
export type ReportUserRouteProp = RouteProp<MainEntryStack, "ReportUser">;
export type ReportCommunityRouteProp = RouteProp<
    MainEntryStack,
    "ReportCommunity"
>;
