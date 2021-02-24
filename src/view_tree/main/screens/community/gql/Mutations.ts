import { gql } from "@apollo/client";
import { FollowEntityType } from "../../../../../global_types/FollowEntityType";

export const FOLLOW_COMMUNITY = gql`
    mutation FollowCommunity($tid: ID!) {
        followCommunity(tid: $tid) {
            tid
            sid
            time
            name
            entityType
        }
    }
`;

export interface FollowCommunityData {
    followCommunity: FollowEntityType;
}

export interface FollowCommunityVariables {
    tid: string;
}

export const UN_FOLLOW_COMMUNITY = gql`
    mutation UnFollowCommunity($tid: ID!) {
        unFollowCommunity(tid: $tid) {
            tid
            sid
            time
            name
            entityType
        }
    }
`;

export interface UnFollowCommunityData {
    unFollowCommunity: FollowEntityType;
}

export interface UnFollowCommunityVariables {
    tid: string;
}
