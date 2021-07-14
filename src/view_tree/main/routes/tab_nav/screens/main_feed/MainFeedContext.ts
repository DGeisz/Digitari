import { createContext } from "react";

export enum FeedType {
    YourFeed,
    AllPosts,
}

export const FeedContext = createContext<{
    feedType: FeedType;
    setType: (feedType: FeedType) => void;
}>({
    feedType: FeedType.AllPosts,
    setType: () => {},
});
