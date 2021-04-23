import { gql } from "@apollo/client";
import { PostType } from "../../../../../../../global_types/PostTypes";

export const GET_FEED = gql`
    query GetFeed($lastTime: String) {
        feed(lastTime: $lastTime) {
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

export interface GetFeedData {
    feed: PostType[];
}

export interface GetFeedVariables {
    lastTime?: string;
}
