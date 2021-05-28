import { USER_TYPENAME, UserType } from "../../../../global_types/UserTypes";
import { ApolloCache } from "@apollo/client";
import {
    ChallengeClass,
    ChallengeType,
    ChallengeTypes,
} from "../../../../global_types/ChallengeTypes";
import { localUid } from "../../../../global_state/UserState";

const bronzeCount = 1;
const silverCount = 10;
const goldCount = 100;
const supremeCount = 1000;

const bronzeCoin = 500;
const silverCoin = 1000;
const goldCoin = 10000;
const supremeCoin = 20000;

export function followersHandler(user: UserType, cache: ApolloCache<any>) {
    if (user.followersChallengeIndex >= 4) {
        return;
    }

    let challengeReceipts: string[] = [];
    let newIndex = 0;

    /*
     * Handle bronze
     */
    if (user.followers >= bronzeCount && user.followersChallengeIndex < 1) {
        newIndex = 1;
        challengeReceipts.push(
            [ChallengeTypes.Followers, bronzeCount].join(":")
        );
    }

    /*
     * Handle silver
     */
    if (user.followers >= silverCount && user.followersChallengeIndex < 2) {
        newIndex = 2;
        challengeReceipts.push(
            [ChallengeTypes.Followers, silverCount].join(":")
        );
    }

    /*
     * Handle gold
     */
    if (user.followers >= goldCount && user.followersChallengeIndex < 3) {
        newIndex = 3;
        challengeReceipts.push([ChallengeTypes.Followers, goldCount].join(":"));
    }

    /*
     * Handle supreme
     */
    if (user.followers >= supremeCount && user.followersChallengeIndex < 4) {
        newIndex = 4;
        challengeReceipts.push(
            [ChallengeTypes.Followers, supremeCount].join(":")
        );
    }

    if (challengeReceipts.length > 0) {
        /*
         * Modify the user
         */
        cache.modify({
            id: cache.identify({
                __typename: USER_TYPENAME,
                id: localUid(),
            }),
            fields: {
                followersChallengeIndex() {
                    return newIndex;
                },
                challengeReceipts(existing) {
                    return !!existing
                        ? [...existing, ...challengeReceipts]
                        : challengeReceipts;
                },
            },
        });
    }
}

export function generateFollowersChallenge(
    challengeClass: ChallengeClass
): ChallengeType {
    const stat = ChallengeTypes.Followers;

    switch (challengeClass) {
        case ChallengeClass.Bronze:
            return {
                class: challengeClass,
                stat,
                reward: bronzeCoin,
                goal: bronzeCount,
            };
        case ChallengeClass.Silver:
            return {
                class: challengeClass,
                stat,
                reward: silverCoin,
                goal: silverCount,
            };
        case ChallengeClass.Gold:
            return {
                class: challengeClass,
                stat,
                reward: goldCoin,
                goal: goldCount,
            };
        case ChallengeClass.Supreme:
            return {
                class: challengeClass,
                stat,
                reward: supremeCoin,
                goal: supremeCount,
            };
    }
}
