import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MainFeedTab = {
    YourFeed: undefined;
    AllPosts: undefined;
};

export type YourFeedNavProp = StackNavigationProp<MainFeedTab, "YourFeed">;
export type AllPostsNavProp = StackNavigationProp<MainFeedTab, "AllPosts">;

export type YourFeedRouteProp = RouteProp<MainFeedTab, "YourFeed">;
