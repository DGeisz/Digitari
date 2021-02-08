import { StackNavigationProp } from "@react-navigation/stack";

export type MainEntryStack = {
    TabNav: undefined;
    Convo: {
        cid: string;
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
