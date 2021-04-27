import { OnSubscriptionDataOptions } from "@apollo/client";
import { ConvoActivatedData } from "../../gql/Subscriptions";
import {
    CONVO_TYPENAME,
    ConvoStatus,
} from "../../../../../../global_types/ConvoTypes";
import { sort_active_convos } from "../utils/cache_utils";

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
         * Reorganize the active convos
         */
        sort_active_convos(cache);
    }
}
