import { gql } from "@apollo/client";
import { PostType } from "../../../../../../../global_types/PostTypes";

export const GET_COMMUNITY_POSTS = gql`
    query GetCommunityPosts($cmid: ID!, $lastTime: String, $tier: Int) {
        communityPosts(cmid: $cmid, lastTime: $lastTime, tier: $tier) {
            id
            uid

            # Main content
            user
            tier
            time
            content

            # Add on
            addOn
            addOnContent
            target
            cmid
            communityName

            # Coin fields
            convoReward
            responseCost
            coin
            coinDonated
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
}
