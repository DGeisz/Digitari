import { gql } from "@apollo/client";
import {
    PostAddOn,
    PostTarget,
    PostType,
} from "../../../../../../../global_types/PostTypes";

export const CREATE_POST = gql`
    mutation CreatePost(
        $content: String
        $addOn: Int
        $addOnContent: String
        $target: Int
        $cmid: ID
        $recipients: Int
    ) {
        createPost(
            content: $content
            addOn: $addOn
            addOnContent: $addOnContent
            target: $target
            cmid: $cmid
            recipients: $recipients
        ) {
            post {
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
            }

            presignedUrl
        }
    }
`;

export interface CreatePostData {
    createPost: {
        post: PostType;
        presignedUrl?: string;
    };
}

export interface CreatePostVariables {
    content: string;
    addOn: PostAddOn;
    addOnContent?: string;
    target: PostTarget;
    cmid?: string;
    recipients: number;
}

export const DISTRIBUTE_POST = gql`
    mutation DistributePost($pid: ID) {
        distributePost(pid: $pid)
    }
`;

export interface DistributePostData {
    distributePost: boolean;
}

export interface DistributePostVariables {
    pid: string;
}
