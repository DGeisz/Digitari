import { USER_TYPENAME, UserType } from "../../../../global_types/UserTypes";
import { ApolloCache } from "@apollo/client";
import { ChallengeTypes } from "../../../../global_types/ChallengeTypes";
import { localUid } from "../../../../global_state/UserState";

const bronzeCount = 1;
const silverCount = 10;
const goldCount = 100;
const supremeCount = 1000;

export function postCountHandler(user: UserType, cache: ApolloCache<any>) {
    if (user.pcChallengeIndex >= 4) {
        return;
    }

    let challengeReceipts: string[] = [];
    let newIndex = 0;

    /*
     * Handle bronze
     */
    if (user.postCount >= bronzeCount && user.pcChallengeIndex < 1) {
        newIndex = 1;
        challengeReceipts.push(
            [ChallengeTypes.PostCount, bronzeCount].join(":")
        );
    }

    /*
     * Handle silver
     */
    if (user.postCount >= silverCount && user.pcChallengeIndex < 2) {
        newIndex = 2;
        challengeReceipts.push(
            [ChallengeTypes.PostCount, silverCount].join(":")
        );
    }

    /*
     * Handle gold
     */
    if (user.postCount >= goldCount && user.pcChallengeIndex < 3) {
        newIndex = 3;
        challengeReceipts.push([ChallengeTypes.PostCount, goldCount].join(":"));
    }

    /*
     * Handle supreme
     */
    if (user.postCount >= supremeCount && user.pcChallengeIndex < 4) {
        newIndex = 4;
        challengeReceipts.push(
            [ChallengeTypes.PostCount, supremeCount].join(":")
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
                pcChallengeIndex() {
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
