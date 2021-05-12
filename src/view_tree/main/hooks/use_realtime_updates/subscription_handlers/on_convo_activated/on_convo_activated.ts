import { OnSubscriptionDataOptions } from "@apollo/client";
import { ConvoActivatedData } from "../../gql/Subscriptions";
import {
    CONVO_TYPENAME,
    ConvoStatus,
} from "../../../../../../global_types/ConvoTypes";
import { sort_active_convos } from "../utils/cache_utils";
import { POST_TYPENAME } from "../../../../../../global_types/PostTypes";

export function onConvoActivated(
    options: OnSubscriptionDataOptions<ConvoActivatedData>
) {
    const {
        client: { cache },
        subscriptionData: { data },
    } = options;

    if (!!data?.convoActivated) {
        const {
            convoActivated: { id: cvid },
            convoActivated: convo,
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
                    return ConvoStatus.Active;
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
         * Modify the corresponding post
         * by bumping the convo count
         * associated with the post
         */
        cache.modify({
            id: cache.identify({
                __typename: POST_TYPENAME,
                id: convo.pid,
            }),
            fields: {
                convoCount(existing) {
                    return existing + 1;
                },
            },
        });

        /*
         * Reorganize the active convos
         */
        sort_active_convos(cache);
    }
}
