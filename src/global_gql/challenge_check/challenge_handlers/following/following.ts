import { USER_TYPENAME, UserType } from "../../../../global_types/UserTypes";
import { ApolloCache } from "@apollo/client";
import { ChallengeTypes } from "../../../../global_types/ChallengeTypes";
import { localUid } from "../../../../global_state/UserState";

const bronzeCount = 1;
const silverCount = 10;
const goldCount = 100;
const supremeCount = 1000;

export function followingHandler(user: UserType, cache: ApolloCache<any>) {
    if (user.followingChallengeIndex >= 4) {
        return;
    }

    let challengeReceipts: string[] = [];
    let newIndex = 0;

    /*
     * Handle bronze
     */
    if (user.following >= bronzeCount && user.followingChallengeIndex < 1) {
        newIndex = 1;
        challengeReceipts.push(
            [ChallengeTypes.Following, bronzeCount].join(":")
        );
    }

    /*
     * Handle silver
     */
    if (user.following >= silverCount && user.followingChallengeIndex < 2) {
        newIndex = 2;
        challengeReceipts.push(
            [ChallengeTypes.Following, silverCount].join(":")
        );
    }

    /*
     * Handle gold
     */
    if (user.following >= goldCount && user.followingChallengeIndex < 3) {
        newIndex = 3;
        challengeReceipts.push([ChallengeTypes.Following, goldCount].join(":"));
    }

    /*
     * Handle supreme
     */
    if (user.following >= supremeCount && user.followingChallengeIndex < 4) {
        newIndex = 4;
        challengeReceipts.push(
            [ChallengeTypes.Following, supremeCount].join(":")
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
                followingChallengeIndex() {
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
