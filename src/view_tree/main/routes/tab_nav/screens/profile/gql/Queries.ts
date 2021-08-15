import { gql } from "@apollo/client";
import { UserType } from "../../../../../../../global_types/UserTypes";

export const GET_USER = gql`
    query GetUser($uid: ID!) {
        user(uid: $uid) {
            id
            firstName
            lastName
            bio
            ranking
            blocked
            beenBlocked
            coin
            imgUrl
            link
            transTotal
            boltTransTotal

            lastCollectionTime

            nameFont
            nameFontsPurchased
            nameColor
            nameColorsPurchased
            bioFont
            bioFontsPurchased
            bioColor
            bioColorsPurchased
            profileSticker
            profileStickersPurchased

            walletBonusEnd
            maxWallet
            maxBoltWallet

            amFollowing
            bolts
            newConvoUpdate
            newTransactionUpdate
            bio
            ranking
            blocked
            beenBlocked
            coin
            challengeReceipts
            coinSpent
            remainingInvites

            level
            levelUsersFollowed
            levelsCommsFollowed
            levelCoinCollected
            levelPostsCreated
            levelPostBoltsBought
            levelInvitedAndJoined
            levelNewResponses
            levelSuccessfulConvos
            levelCommsCreated

            # This is coin spent posting
            levelCoinSpentOnPosts
            levelCoinEarnedFromPosts
            maxFollowing
            maxFollowers
            maxPostRecipients

            receivedFromConvos
            rfcChallengeIndex
            spentOnConvos
            socChallengeIndex
            successfulConvos
            scChallengeIndex
            postCount
            pcChallengeIndex
            followers
            followersChallengeIndex
            following
            followingChallengeIndex
            communityFollowersChallengeIndex
            maxCommunityFollowers
        }
    }
`;

export interface GetUserQueryData {
    user: UserType;
}

/*
 * This interface includes the possibility that the
 * user doesn't exist
 */
export interface GetUserDataAlt {
    user?: UserType;
}

export interface GetUserQueryVariables {
    uid: string;
}
