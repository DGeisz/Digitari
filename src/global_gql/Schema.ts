import { gql } from "@apollo/client";

export const schema = gql`
    type User {
        id: ID
        firstName: String
        lastName: String
        level: Int
        bio: String
        ranking: Int
        blocked: Int
        beenBlocked: Int
        coin: Int

        coinSpent: Int
        csGoal: Int
        nextCsIndex: Int

        postCount: Int
        pcGoal: Int
        nextPcIndex: Int

        donated2Other: Int
        d2OGoal: Int
        nextD2OIndex: Int

        donated2User: Int
        d2UGoal: Int
        nextD2UIndex: Int

        responses2Other: Int
        r2OGoal: Int
        nextR2OIndex: Int

        responses2User: Int
        r2UGoal: Int
        nextR2UIndex: Int

        successfulConvos: Int
        scGoal: Int
        nextScIndex: Int

        following: Int
        fgGoal: Int
        nextFgIndex: Int

        followers: Int
        fsGoal: Int
        nextFsIndex: Int

        followersViaLink: Int
        fvlGoal: Int
        nextFvlIndex: Int

        comsCreated: Int
        ccGoal: Int
        nextCcIndex: Int

        welcomeCount: Int
        wcGoal: Int
        nextWcIndex: Int

        invite2ComViaLink: Int
        i2cGoal: Int
        nextI2CIndex: Int
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
        tviewed: Boolean
    }

    type ConvoMsg {
        id: ID
        uid: String
        user: String
        time: Int
        anonymous: Boolean
        content: String
    }

    type Convo {
        id: ID
        cover: ConvoCover
        post: Post
        status: Int
        messages: [ConvoMsg]
    }

    type Post {
        id: ID
        uid: ID
        user: String
        ranking: Int
        time: Int
        content: String
        link: String
        convoReward: Int
        responseCost: Int
        coin: Int
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
        user: User
        userPosts(uid: ID!, lastTime: Int): [Post]
        userConvos(uid: ID!, lastTime: Int): [ConvoCover]
        newConvos(uid: ID!, lastTime: Int): [ConvoCover]
        activeConvos(uid: ID!, lastTime: Int): [ConvoCover]
        challenges: [Challenge]
        post(pid: ID!): Post
        convo(cid: ID!): Convo
    }

    type Mutation {
        dismissConvo(cid: ID!): Convo
        blockInitialConvo(cid: ID!): Convo
        activateConvo(cid: ID!): Convo
        blockMessage(cid: ID!): Convo
        finishConvo(cid: ID!): Convo
        sendMessage(
            cid: ID!
            uid: String
            user: String
            anonymous: Boolean
            content: String
        ): ConvoMsg
    }
`;

export const QUERY_TYPENAME = "Query";
