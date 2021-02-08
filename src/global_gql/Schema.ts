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
        pid: ID

        new: Boolean
        active: Boolean

        time: Int
        msg: String

        sid: ID
        sranking: Int
        sname: String
        sanony: Boolean
        sviewed: Boolean

        tid: ID
        tranking: Int
        tname: String
        tanony: Boolean
        tviewed: Boolean
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

    type Challenge {
        index: Int
        class: Int
        tier: Int
        description: String
        coinReward: Int
        goal: Int
    }

    type Query {
        feed(uid: ID!, lastTime: Int): [Post]
        wallet(id: ID!): Wallet
        userPosts(uid: ID!, lastTime: Int): [Post]
        userConvos(uid: ID!, lastTime: Int): [ConvoCover]
        newConvos(uid: ID!, lastTime: Int): [ConvoCover]
        activeConvos(uid: ID!, lastTime: Int): [ConvoCover]
        challenges: [Challenge]
    }
`;
