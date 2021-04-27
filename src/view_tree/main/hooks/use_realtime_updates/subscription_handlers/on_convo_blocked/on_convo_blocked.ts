import { OnSubscriptionDataOptions } from "@apollo/client";
import {
    CONVO_TYPENAME,
    ConvoStatus,
} from "../../../../../../global_types/ConvoTypes";
import { sort_active_convos } from "../utils/cache_utils";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { localUid } from "../../../../../../global_state/UserState";
import { ConvoBlockedData } from "../../gql/Subscriptions";

export function onConvoBlocked(
    options: OnSubscriptionDataOptions<ConvoBlockedData>
) {
    const {
        client: { cache },
        subscriptionData: { data },
    } = options;

    if (!!data?.convoBlocked) {
        const {
            convoBlocked: {
                convo: { id: cvid },
            },
        } = data;

        /*
         * Modify the convo.  Artificially bump
         * the last time so user gets a chance to notice
         * the blocked convo on the client
         */
        cache.modify({
            id: cache.identify({
                __typename: CONVO_TYPENAME,
                id: cvid,
            }),
            fields: {
                lastTime() {
                    return Date.now().toString();
                },
                status() {
                    return ConvoStatus.Blocked;
                },
                tviewed() {
                    return false;
                },
                sviewed() {
                    return false;
                },
            },
        });

        /*
         * Reorganize the active convos
         */
        sort_active_convos(cache);

        /*
         * Now we need to increase the user's beenBlocked,
         * and decrease user's ranking
         */
        cache.modify({
            id: cache.identify({
                __typename: USER_TYPENAME,
                id: localUid(),
            }),
            fields: {
                beenBlocked(existing) {
                    return existing + 1;
                },
                ranking(existing) {
                    return existing - 1;
                },
            },
        });
    }
}
