import { gql } from "@apollo/client";
import { FollowEntityType } from "../../../../../../../global_types/FollowEntityType";

export const GET_FOLLOWERS = gql`
    query GetFollowers($tid: ID!, $lastTime: String) {
        followers(tid: $tid, lastTime: $lastTime) {
            tid
            sid
            name
            imgUrl
            time
            entityType
        }
    }
`;

export interface GetFollowersData {
    followers: FollowEntityType[];
}

export interface GetFollowersVariables {
    tid: string;
    lastTime?: string;
}
