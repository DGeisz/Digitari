import { USER_TYPENAME, UserType } from "../../../../global_types/UserTypes";
import { ApolloCache } from "@apollo/client";
import {
    ChallengeClass,
    ChallengeType,
    ChallengeTypes,
} from "../../../../global_types/ChallengeTypes";
import { localUid } from "../../../../global_state/UserState";

const bronzeCount = 20;
const silverCount = 200;
const goldCount = 2000;
const supremeCount = 20000;

const bronzeCoin = 250;
const silverCoin = 500;
const goldCoin = 5000;
const supremeCoin = 20000;

export function spentOnConvosHandler(user: UserType, cache: ApolloCache<any>) {
    if (user.socChallengeIndex >= 4) {
        return;
    }

    let challengeReceipts: string[] = [];
    let newIndex = 0;

    const spentOnConvos = parseInt(user.spentOnConvos);

    /*
     * Handle bronze
     */
    if (spentOnConvos >= bronzeCount && user.socChallengeIndex < 1) {
        newIndex = 1;
        challengeReceipts.push(
            [ChallengeTypes.SpentOnConvos, bronzeCount].join(":")
        );
    }

    /*
     * Handle silver
     */
    if (spentOnConvos >= silverCount && user.socChallengeIndex < 2) {
        newIndex = 2;
        challengeReceipts.push(
            [ChallengeTypes.SpentOnConvos, silverCount].join(":")
        );
    }

    /*
     * Handle gold
     */
    if (spentOnConvos >= goldCount && user.socChallengeIndex < 3) {
        newIndex = 3;
        challengeReceipts.push(
            [ChallengeTypes.SpentOnConvos, goldCount].join(":")
        );
    }

    /*
     * Handle supreme
     */
    if (spentOnConvos >= supremeCount && user.socChallengeIndex < 4) {
        newIndex = 4;
        challengeReceipts.push(
            [ChallengeTypes.SpentOnConvos, supremeCount].join(":")
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
                socChallengeIndex() {
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

export function generateSocChallenge(
    challengeClass: ChallengeClass
): ChallengeType {
    const stat = ChallengeTypes.SpentOnConvos;

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
