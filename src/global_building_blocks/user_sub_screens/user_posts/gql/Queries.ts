import { gql } from "@apollo/client";

export const GET_USER_POSTS = gql`
    query GetUserPosts($uid: ID!, $lastTime: Int) {
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
