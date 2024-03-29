import { gql } from "@apollo/client";
import { PostType } from "../../../../../../../../../global_types/PostTypes";

export const GET_FEED = gql`
    query GetFeed($lastTime: String, $skipReward: Boolean) {
        feed(lastTime: $lastTime, skipReward: $skipReward) {
            id
            uid
            userPic

            nameColor
            nameFont
            sticker

            # Main content
            user
            tier
            time
            content
            boltsBought

            # Add on
            addOn
            addOnContent
            target
            cmid
            communityName

            # Coin fields
            responseCost
            coin

            convoCount
            responseCount
        }
    }
`;

export interface GetFeedData {
    feed: PostType[];
}

export interface GetFeedVariables {
    lastTime?: string;
    skipReward?: boolean;
}
