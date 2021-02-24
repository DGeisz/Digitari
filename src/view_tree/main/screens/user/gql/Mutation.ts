import { gql } from "@apollo/client";
import { FollowEntityType } from "../../../../../global_types/FollowEntityType";

export const FOLLOW_USER = gql`
    mutation FollowUser($tid: ID!) {
        followUser(tid: $tid) {
            tid
            sid
            time
            name
            entityType
        }
    }
`;

export interface FollowUserData {
    followUser: FollowEntityType;
}

export interface FollowUserVariables {
    tid: string;
}

export const UN_FOLLOW_USER = gql`
    mutation UnFollowUser($tid: ID!) {
        unFollowUser(tid: $tid) {
            tid
            sid
            time
            name
            entityType
        }
    }
`;

export interface UnFollowUserData {
    unFollowUser: FollowEntityType;
}

export interface UnFollowUserVariables {
    tid: string;
}
