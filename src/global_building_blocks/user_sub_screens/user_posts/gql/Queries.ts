import { gql } from "@apollo/client";
import { PostType } from "../../../../global_types/PostTypes";

export const GET_USER_POSTS = gql`
    query GetUserPosts($uid: ID!, $lastTime: String) {
        userPosts(uid: $uid, lastTime: $lastTime) {
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
        }
    }
`;

export interface GetUserPostsData {
    userPosts: PostType[];
}

export interface GetUserPostVariables {
    uid: string;
    lastTime?: string;
}
