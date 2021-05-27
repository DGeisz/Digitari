import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const MAX_FEED_WIDTH = 600;
export const GENERAL_CONTENT_WIDTH =
    width > MAX_FEED_WIDTH ? MAX_FEED_WIDTH : width;
export const SCREEN_LARGER_THAN_CONTENT = width > MAX_FEED_WIDTH;
