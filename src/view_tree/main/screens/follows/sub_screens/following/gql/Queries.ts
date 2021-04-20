import { gql } from "@apollo/client";
import {
    FollowEntityEnum,
    FollowEntityType,
} from "../../../../../../../global_types/FollowEntityType";

export const GET_FOLLOWING = gql`
    query GetFollowing($sid: ID!, $lastTime: String, $entityType: Int) {
        following(sid: $sid, lastTime: $lastTime, entityType: $entityType) {
            tid
            sid
            name
            imgUrl
            time
            entityType
        }
    }
`;

export interface GetFollowingData {
    following: FollowEntityType[];
}

export interface GetFollowingVariables {
    sid: string;
    lastTime?: string;
    entityType?: FollowEntityEnum;
}
