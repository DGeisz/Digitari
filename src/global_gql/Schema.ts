import { gql } from "@apollo/client";

export const schema = gql`
    directive @aws_iam on FIELD_DEFINITION | OBJECT

    directive @aws_cognito_user_pools on FIELD_DEFINITION | OBJECT

    type User @aws_iam @aws_cognito_user_pools {
        id: ID
        firstName: String
        lastName: String
        userName: String
        email: String
        timeCreated: String
        imgUrl: String

        # Indicates whether the person who fetched this user is following this user.
        amFollowing: Boolean
        followPrice: Int

        newUser: Boolean

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
        time: String
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

    type CoinCheck {
        coin: Int
        price: Int
    }

    type Community @aws_iam @aws_cognito_user_pools {
        id: ID

        amFollowing: Boolean
        followPrice: Int

        uid: ID
        name: String
        description: String
        followers: Int
        timeCreated: String
    }

    type SearchEntity @aws_iam @aws_cognito_user_pools {
        id: ID
        name: String
        imgUrl: String
        followers: Int
        entityType: Int
    }

    type FollowEntity @aws_iam @aws_cognito_user_pools {
        sid: ID
        tid: ID
        time: String
        name: String
        imgUrl: String
        entityType: Int
    }

    type PaginatedFollowEntities @aws_iam @aws_cognito_user_pools {
        entities: [FollowEntity]
        nextToken: String
    }

    type ImgUrl {
        url: String
        presignedUrl: String
    }

    type Query @aws_iam @aws_cognito_user_pools {
        feed(uid: ID!, lastTime: Int): [Post]
        wallet(id: ID!): Wallet
        user(uid: ID!): User
        userPosts(uid: ID!, lastTime: Int): [Post]
        userConvos(uid: ID!, lastTime: Int): [ConvoCover]
        newConvos(uid: ID!, lastTime: Int): [ConvoCover]
        activeConvos(uid: ID!, lastTime: Int): [ConvoCover]
        challenges: [Challenge]
        post(pid: ID!): Post
        convo(cid: ID!): Convo
        createCommunityCoinCheck: CoinCheck
        community(cmid: ID!): Community
        search(text: String!, offset: Int, entityType: Int): [SearchEntity]
        searchEntity(id: ID!): SearchEntity
        followers(tid: ID!, lastTime: String): [FollowEntity]
        following(sid: ID!, lastTime: String, entityType: Int): [FollowEntity]
    }

    type Mutation {
        createOrFetchUser(
            firstName: String!
            lastName: String!
            email: String!
        ): User
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
        newConvo(pid: ID!, sanony: Boolean!, msg: String!): Convo
        createCommunity(name: String, description: String): Community
        indexUser(id: ID, firstName: String, lastName: String): SearchEntity
        followUser(tid: ID!): FollowEntity
        unFollowUser(tid: ID!): FollowEntity
        followCommunity(tid: ID!): FollowEntity
        unFollowCommunity(tid: ID!): FollowEntity
        createPost(
            content: String
            link: String
            convoReward: Int
            responseCost: Int
            post2Followers: Boolean
            numUserFollowers: Int
            post2Community: Boolean
            cmid: ID
            numComFollowers: Int
        ): Post
        updateBio(bio: String): User
        updateProfilePic(imgName: String): ImgUrl
    }

    schema {
        mutation: Mutation
        query: Query
    }
`;

export const QUERY_TYPENAME = "Query";
