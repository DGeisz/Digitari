import { gql } from "@apollo/client";

export const schema = gql`
    directive @aws_iam on FIELD_DEFINITION | OBJECT
    directive @aws_cognito_user_pools on FIELD_DEFINITION | OBJECT
    directive @aws_subscribe(mutations: [String]) on FIELD_DEFINITION

    type User @aws_iam @aws_cognito_user_pools {
        id: ID
        firstName: String
        lastName: String
        userName: String
        email: String
        timeCreated: String
        imgUrl: String

        lastCollectionTime: String

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

    type Convo {
        id: ID
        pid: ID
        cmid: ID

        status: Int

        initialTime: String
        initialMsg: String

        lastTime: String
        lastMsg: String

        sid: ID
        stier: Int
        sranking: Int
        sname: String
        sanony: Boolean
        sviewed: Boolean

        tid: ID
        ttier: Int
        tranking: Int
        tname: String
        tviewed: Boolean

        targetMsgCount: Int
        convoReward: Int
        responseCost: Int
    }

    type ConvoUpdate {
        convo: Convo
        tid: ID
    }

    type Message {
        id: ID
        uid: ID
        tid: ID
        user: String
        time: String
        anonymous: Boolean
        content: String
    }

    type Post {
        id: ID
        uid: ID

        # Main content
        user: String
        tier: Int
        time: String
        content: String

        # Add on
        addOn: Int
        addOnContent: String
        target: Int
        cmid: ID
        communityName: String

        # Coin fields
        convoReward: Int
        responseCost: Int
        coin: Int
        coinDonated: Boolean

        # Convos
        convoCount: Int
        responseCount: Int
    }

    type PostPackage {
        post: Post
        presignedUrl: String
    }

    type Transaction {
        tid: ID
        time: String
        coin: Int
        message: String
        transactionType: Int
        data: String
    }

    type EarningsReceipt {
        coin: Int
        time: String
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
        feed(lastTime: String): [Post]
        user(uid: ID!): User
        hid: String
        userPosts(uid: ID!, lastTime: String): [Post]
        userConvos(uid: ID!, lastTime: String): [Convo]
        newConvos(orderingType: Int, offset: Int): [Convo]
        activeConvos(lastTime: String): [Convo]
        challenges: [Challenge]
        post(pid: ID!): Post
        postConvos(pid: ID!, orderingType: Int!, offset: Int): [Convo]
        convo(cvid: ID!): Convo
        convoMessages(cvid: ID!, lastTime: String): [Message]
        createCommunityCoinCheck: CoinCheck
        community(cmid: ID!): Community
        communityPosts(cmid: ID!, lastTime: String, tier: Int): [Post]
        communityConvos(cmid: ID!, lastTime: String, tier: Int): [Convo]
        search(text: String!, offset: Int, entityType: Int): [SearchEntity]
        topResults(offset: Int, entityType: Int): [SearchEntity]
        searchEntity(id: ID!): SearchEntity
        followers(tid: ID!, lastTime: String): [FollowEntity]
        following(sid: ID!, lastTime: String, entityType: Int): [FollowEntity]
        postResponseCheck(pid: ID): Boolean
        transactionAccumulation: Int
        transactions(lastTime: String): [Transaction]
    }

    type Mutation {
        createOrFetchUser(
            firstName: String!
            lastName: String!
            email: String!
        ): User

        registerPush(token: String!): Boolean

        createConvo(pid: ID, message: String, anonymous: Boolean): Convo

        markConvoViewed(cvid: ID!): Convo
        dismissConvo(cvid: ID!): Convo
        activateConvo(cvid: ID!): Convo

        blockConvo(cvid: ID!): ConvoUpdate
        finishConvo(cvid: ID!): ConvoUpdate

        createMessage(cvid: ID!, message: String!): Message

        createCommunity(name: String, description: String): Community
        indexUser(id: ID, firstName: String, lastName: String): SearchEntity
        followUser(tid: ID!): FollowEntity
        unFollowUser(tid: ID!): FollowEntity
        followCommunity(tid: ID!): FollowEntity
        unFollowCommunity(tid: ID!): FollowEntity
        createPost(
            content: String
            addOn: Int
            addOnContent: String
            target: Int
            cmid: ID

            recipients: Int
        ): PostPackage
        updateBio(bio: String): User
        updateProfilePic(imgName: String): ImgUrl
        deleteSearchEntity(id: String): SearchEntity

        collectEarnings: EarningsReceipt
    }

    type Subscription {
        convoCreated(tid: ID!): Convo @aws_subscribe(mutations: ["createConvo"])

        messageAdded(tid: ID!): Message
            @aws_subscribe(mutations: ["createMessage"])

        convoDismissed(sid: ID!): Convo
            @aws_subscribe(mutations: ["dismissConvo"])
        convoActivated(sid: ID!): Convo
            @aws_subscribe(mutations: ["activateConvo"])

        convoBlocked(tid: ID!): ConvoUpdate
            @aws_subscribe(mutations: ["blockConvo"])
        convoFinished(tid: ID!): ConvoUpdate
            @aws_subscribe(mutations: ["finishConvo"])
    }

    schema {
        mutation: Mutation
        query: Query
        subscription: Subscription
    }
`;

export const QUERY_TYPENAME = "Query";
