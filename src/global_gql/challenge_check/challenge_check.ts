import { ApolloCache } from "@apollo/client";
import {
    CHALLENGE_USER,
    ChallengeUserData,
    ChallengeUserVariables,
} from "./gql/Queries";
import { localUid } from "../../global_state/UserState";
import { receivedFromConvosHandler } from "./challenge_handlers/received_from_convos/received_from_convos";
import { spentOnConvosHandler } from "./challenge_handlers/spent_on_convos/spent_on_convos";
import { postCountHandler } from "./challenge_handlers/post_count/post_count";
import { successfulConvosHandler } from "./challenge_handlers/successful_convos/successful_convos";
import { followersHandler } from "./challenge_handlers/followers/followers";
import { followingHandler } from "./challenge_handlers/following/following";

export function challengeCheck(cache: ApolloCache<any>) {
    const data = cache.readQuery<ChallengeUserData, ChallengeUserVariables>({
        query: CHALLENGE_USER,
        variables: {
            uid: localUid(),
        },
    });

    if (!!data?.user) {
        receivedFromConvosHandler(data.user, cache);
        spentOnConvosHandler(data.user, cache);
        postCountHandler(data.user, cache);
        successfulConvosHandler(data.user, cache);
        followersHandler(data.user, cache);
        followingHandler(data.user, cache);
    }
}
