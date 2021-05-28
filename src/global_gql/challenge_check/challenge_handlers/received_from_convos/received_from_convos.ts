import { USER_TYPENAME, UserType } from "../../../../global_types/UserTypes";
import { ApolloCache } from "@apollo/client";
import {
    ChallengeClass,
    ChallengeType,
    ChallengeTypes,
} from "../../../../global_types/ChallengeTypes";
import { localUid } from "../../../../global_state/UserState";

const bronzeCount = 10;
const silverCount = 100;
const goldCount = 1000;
const supremeCount = 10000;

const bronzeCoin = 500;
const silverCoin = 1000;
const goldCoin = 5000;
const supremeCoin = 10000;

export function receivedFromConvosHandler(
    user: UserType,
    cache: ApolloCache<any>
) {
    if (user.rfcChallengeIndex >= 4) {
        return;
    }

    let challengeReceipts: string[] = [];
    let newIndex = 0;

    /*
     * Handle bronze
     */
    if (user.receivedFromConvos >= bronzeCount && user.rfcChallengeIndex < 1) {
        newIndex = 1;
        challengeReceipts.push(
            [ChallengeTypes.ReceivedFromConvos, bronzeCount].join(":")
        );
    }

    /*
     * Handle silver
     */
    if (user.receivedFromConvos >= silverCount && user.rfcChallengeIndex < 2) {
        newIndex = 2;
        challengeReceipts.push(
            [ChallengeTypes.ReceivedFromConvos, silverCount].join(":")
        );
    }

    /*
     * Handle gold
     */
    if (user.receivedFromConvos >= goldCount && user.rfcChallengeIndex < 3) {
        newIndex = 3;
        challengeReceipts.push(
            [ChallengeTypes.ReceivedFromConvos, goldCount].join(":")
        );
    }

    /*
     * Handle supreme
     */
    if (user.receivedFromConvos >= supremeCount && user.rfcChallengeIndex < 4) {
        newIndex = 4;
        challengeReceipts.push(
            [ChallengeTypes.ReceivedFromConvos, supremeCount].join(":")
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
                rfcChallengeIndex() {
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

export function generateRfcChallenge(
    challengeClass: ChallengeClass
): ChallengeType {
    const stat = ChallengeTypes.ReceivedFromConvos;

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
