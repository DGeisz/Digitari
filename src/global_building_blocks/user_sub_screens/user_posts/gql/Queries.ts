import { gql } from "@apollo/client";
import { PostType } from "../../../../global_types/PostTypes";

export const GET_USER_POSTS = gql`
    query GetUserPosts($uid: ID!, $lastTime: String, $skipReward: Boolean) {
        userPosts(uid: $uid, lastTime: $lastTime, skipReward: $skipReward) {
            id
            uid

            nameColor
            nameFont

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
            responseCost
            coin
            convoCount
            responseCount
        }
    }
`;

export interface GetUserPostsData {
    userPosts: PostType[];
}

export interface GetUserPostVariables {
    uid: string;
    lastTime?: string;
    skipReward?: boolean;
}
