import { gql } from "@apollo/client";
import { UserType } from "../../../../../global_types/UserTypes";

export const LEVEL_UP = gql`
    mutation LevelUp {
        levelUp {
            id
            firstName
            lastName
            email
            timeCreated
            imgUrl
            remainingInvites
            transTotal
            boltTransTotal

            lastCollectionTime

            #
            amFollowing

            newConvoUpdate
            newTransactionUpdate

            bio
            link
            ranking
            blocked
            beenBlocked
            coin
            bolts

            #
            maxWallet
            walletBonusEnd

            maxBoltWallet

            #
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

            challengeReceipts
            coinSpent

            #
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

            #
            levelCoinSpentOnPosts
            levelCoinEarnedFromPosts
            maxFollowing
            maxFollowers
            maxPostRecipients

            #
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

export interface LevelUpData {
    levelUp: UserType;
}

export interface LevelUpVariables {}
