import { USER_TYPENAME, UserType } from "../../../../global_types/UserTypes";
import { ApolloCache } from "@apollo/client";
import { ChallengeTypes } from "../../../../global_types/ChallengeTypes";
import { localUid } from "../../../../global_state/UserState";

const bronzeCount = 10;
const silverCount = 100;
const goldCount = 1000;
const supremeCount = 10000;

export function spentOnConvosHandler(user: UserType, cache: ApolloCache<any>) {
    if (user.socChallengeIndex >= 4) {
        return;
    }

    let challengeReceipts: string[] = [];
    let newIndex = 0;

    /*
     * Handle bronze
     */
    if (user.spentOnConvos >= bronzeCount && user.socChallengeIndex < 1) {
        newIndex = 1;
        challengeReceipts.push(
            [ChallengeTypes.SpentOnConvos, bronzeCount].join(":")
        );
    }

    /*
     * Handle silver
     */
    if (user.spentOnConvos >= silverCount && user.socChallengeIndex < 2) {
        newIndex = 2;
        challengeReceipts.push(
            [ChallengeTypes.SpentOnConvos, silverCount].join(":")
        );
    }

    /*
     * Handle gold
     */
    if (user.spentOnConvos >= goldCount && user.socChallengeIndex < 3) {
        newIndex = 3;
        challengeReceipts.push(
            [ChallengeTypes.SpentOnConvos, goldCount].join(":")
        );
    }

    /*
     * Handle supreme
     */
    if (user.spentOnConvos >= supremeCount && user.socChallengeIndex < 4) {
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
