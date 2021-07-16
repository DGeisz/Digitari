import { gql } from "@apollo/client";

export const USER_COIN_CHECK = gql`
    query UserCoinCheck($uid: ID!) {
        user(uid: $uid) {
            id
            coin
        }
    }
`;

export interface UserCoinCheckData {
    user: {
        id: string;
        coin: string;
    };
}

export interface UserCoinCheckVariables {
    uid: string;
}

export const CREATE_COMMUNITY_CHECK = gql`
    query CreateCommunityCheck {
        createCommunityCoinCheck {
            coin
            price
        }
    }
`;

export interface CreateCommunityCheckQueryData {
    createCommunityCoinCheck: {
        coin: string;
        price: number;
    };
}

export interface CreateCommunityCheckQueryVariables {}
