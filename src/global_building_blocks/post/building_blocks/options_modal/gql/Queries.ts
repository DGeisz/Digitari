import { gql } from "@apollo/client";

export const USER_COIN = gql`
    query UserCoin($uid: ID!) {
        user(uid: $uid) {
            id
            coin
        }
    }
`;

export interface UserCoinData {
    user: {
        id: string;
        coin: string;
    };
}

export interface UserCoinVariables {
    uid: string;
}
