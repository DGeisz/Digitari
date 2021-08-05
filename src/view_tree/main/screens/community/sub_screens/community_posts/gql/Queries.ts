import { gql } from "@apollo/client";
import { PostType } from "../../../../../../../global_types/PostTypes";

export const MAX_COMMUNITY_POSTS_PER_PAGE = 20;

export const GET_COMMUNITY_POSTS = gql`
    query GetCommunityPosts(
        $cmid: ID!
        $lastTime: String
        $tier: Int
        $skipReward: Boolean
    ) {
        communityPosts(
            cmid: $cmid
            lastTime: $lastTime
            tier: $tier
            skipReward: $skipReward
        ) {
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

export interface GetCommunityPostsData {
    communityPosts: PostType[];
}

export interface GetCommunityPostsVariables {
    cmid: string;
    lastTime?: string;
    tier?: number;
    skipReward?: boolean;
}
