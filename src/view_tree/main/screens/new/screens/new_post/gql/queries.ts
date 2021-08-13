import { gql } from "@apollo/client";

export const GET_SELF = gql`
    query GetSelf($uid: ID!) {
        user(uid: $uid) {
            id
            followers
            maxPostRecipients
            level
            coin
        }
    }
`;

export interface GetSelfData {
    user: {
        followers: number;
        coin: string;
        maxPostRecipients: number;
        level: number;
    };
}

export interface GetSelfVariables {
    uid: string;
}

export const GET_POST_COMMUNITY = gql`
    query GetPostCommunity($id: ID!) {
        community(cmid: $id) {
            id
            followers
            name
        }
    }
`;

export interface GetPostCommunityData {
    community: {
        id: string;
        followers: number;
        name: string;
    };
}

export interface GetPostCommunityVariables {
    id: string;
}
