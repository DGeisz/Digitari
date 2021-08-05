import { gql } from "@apollo/client";
import { PostType } from "../../../../../../../../../global_types/PostTypes";

export const ALL_POSTS = gql`
    query AllPosts($lastTime: String, $skipReward: Boolean) {
        allPosts(lastTime: $lastTime, skipReward: $skipReward) {
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

export interface AllPostsData {
    allPosts: PostType[];
}

export interface AllPostsVariables {
    lastTime?: string;
    skipReward?: boolean;
}
