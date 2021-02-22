import { gql } from "@apollo/client";

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
        coin: number;
        price: number;
    };
}

export interface CreateCommunityCheckQueryVariables {}
