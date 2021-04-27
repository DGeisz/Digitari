import { OnSubscriptionDataOptions } from "@apollo/client";
import {
    CONVO_TYPENAME,
    ConvoStatus,
} from "../../../../../../global_types/ConvoTypes";
import { sort_active_convos } from "../utils/cache_utils";
import { ConvoDismissedData } from "../../gql/Subscriptions";

export function onConvoDismissedData(
    options: OnSubscriptionDataOptions<ConvoDismissedData>
) {
    const {
        client: { cache },
        subscriptionData: { data },
    } = options;

    if (!!data?.convoDismissed) {
        const {
            convoDismissed: { id: cvid },
        } = data;

        /*
         * Modify the convo.  Artificially bump
         * the last time so user gets a chance to notice
         * the dismissed convo on the client
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
                    return ConvoStatus.Dismissed;
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
