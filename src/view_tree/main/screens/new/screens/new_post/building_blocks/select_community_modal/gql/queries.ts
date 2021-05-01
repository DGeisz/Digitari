import { gql } from "@apollo/client";

export const GET_MY_COMMUNITIES = gql`
    query GetMyCommunities($uid: ID!, $lastTime: String) {
        following(sid: $uid, entityType: 1, lastTime: $lastTime) {
            tid
            sid
            name
            time
        }
    }
`;

export interface MyCommunitiesData {
    following: {
        tid: string;
        name: string;
        time: string;
    }[];
}

export interface MyCommunitiesVariables {
    uid: string;
    lastTime?: string;
}

export const SEARCH_COMMUNITIES = gql`
    query SearchCommunities($search: String!, $offset: Int) {
        search(text: $search, offset: $offset, entityType: 1) {
            id
            name
            followers
        }
    }
`;

export interface SearchCommunitiesData {
    search: {
        id: string;
        name: string;
        followers: number;
    }[];
}

export interface SearchCommunitiesVariables {
    search: string;
    offset?: number;
}
