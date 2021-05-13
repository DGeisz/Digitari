import { USER_TYPENAME, UserType } from "../../../../global_types/UserTypes";
import { ApolloCache } from "@apollo/client";
import { ChallengeTypes } from "../../../../global_types/ChallengeTypes";
import { localUid } from "../../../../global_state/UserState";

const bronzeCount = 10;
const silverCount = 100;
const goldCount = 1000;
const supremeCount = 10000;

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
