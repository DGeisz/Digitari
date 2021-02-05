import { gql } from "@apollo/client";

export const schema = gql`
    type User {
        id: ID
        user: String
        level: Int
        bio: String
        ranking: Int
        blocked: Int
        beenBlocked: Int
        successfulConvos: Int
        coin: Int
        followers: Int
        following: Int
    }

    type ConvoCover {
        id: ID
        user: String
        time: Int
        msg: String
    }

    type ConvoMsg {
        id: ID
        anonymous: Boolean
        content: String
    }

    type Post {
        id: ID
        user: String
        ranking: Int
        time: Int
        content: String
        link: String
        convoReward: Int
        responseCost: Int
        coin: Int
        convoCount: Int
        responseCount: Int
        coinDonated: Boolean
        convos: [ConvoCover]
    }

    type Wallet {
        id: ID
        sum: Int
        expirationTime: Int
        entries: [WalletEntry]
    }

    type WalletEntry {
        time: Int
        content: String
        coin: Int
        entryType: Int
        meta: String
    }

    type Query {
        getFeed(uid: ID!, lastTime: Int): [Post]
        getWallet(id: ID!): Wallet
        getUserPosts(uid: ID!, lastTime: Int): [Post]
    }
`;
