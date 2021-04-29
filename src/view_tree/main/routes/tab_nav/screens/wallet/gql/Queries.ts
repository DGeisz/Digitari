import { gql } from "@apollo/client";

export const LAST_COLLECTION_TIME = gql`
    query LastCollectionTime($uid: ID!) {
        user(uid: $uid) {
            id
            lastCollectionTime
            ranking
        }
    }
`;

export interface LastCollectionTimeData {
    user: {
        lastCollectionTime: string;
        ranking: number;
    };
}

export interface LastCollectionTimeVariables {
    uid: string;
}
