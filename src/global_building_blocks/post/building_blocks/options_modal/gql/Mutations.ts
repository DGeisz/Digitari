import { gql } from "@apollo/client";
import { POST_TYPENAME, PostType } from "../../../../../global_types/PostTypes";

export const BLOCK_POST = gql`
    mutation BlockPost($pid: ID!) {
        blockPost(pid: $pid) {
            id
            uid

            user
            tier
            time
            content

            addOn
            addOnContent
            target
            cmid
            communityName

            convoReward
            responseCost
            coin
            coinDonated

            convoCount
            responseCount
        }
    }
`;

export interface BlockPostData {
    blockPost: PostType;
}

export interface BlockPostVariables {
    pid: string;
}
