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
const goldCount = 50;
const supremeCount = 500;

const bronzeCoin = 500;
const silverCoin = 1000;
const goldCoin = 5000;
const supremeCoin = 10000;

export function successfulConvosHandler(
    user: UserType,
    cache: ApolloCache<any>
) {
    if (user.scChallengeIndex >= 4) {
        return;
    }

    let challengeReceipts: string[] = [];
    let newIndex = 0;

    /*
     * Handle bronze
     */
    if (user.successfulConvos >= bronzeCount && user.scChallengeIndex < 1) {
        newIndex = 1;
        challengeReceipts.push(
            [ChallengeTypes.SuccessfulConvos, bronzeCount].join(":")
        );
    }

    /*
     * Handle silver
     */
    if (user.successfulConvos >= silverCount && user.scChallengeIndex < 2) {
        newIndex = 2;
        challengeReceipts.push(
            [ChallengeTypes.SuccessfulConvos, silverCount].join(":")
        );
    }

    /*
     * Handle gold
     */
    if (user.successfulConvos >= goldCount && user.scChallengeIndex < 3) {
        newIndex = 3;
        challengeReceipts.push(
            [ChallengeTypes.SuccessfulConvos, goldCount].join(":")
        );
    }

    /*
     * Handle supreme
     */
    if (user.successfulConvos >= supremeCount && user.scChallengeIndex < 4) {
        newIndex = 4;
        challengeReceipts.push(
            [ChallengeTypes.SuccessfulConvos, supremeCount].join(":")
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
                scChallengeIndex() {
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

export function generateScChallenge(
    challengeClass: ChallengeClass
): ChallengeType {
    const stat = ChallengeTypes.SuccessfulConvos;

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
