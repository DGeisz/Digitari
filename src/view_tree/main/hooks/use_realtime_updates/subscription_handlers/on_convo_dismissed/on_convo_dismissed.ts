import { OnSubscriptionDataOptions } from "@apollo/client";
import {
    CONVO_TYPENAME,
    ConvoStatus,
} from "../../../../../../global_types/ConvoTypes";
import { addTransaction, sort_active_convos } from "../utils/cache_utils";
import { ConvoDismissedData } from "../../gql/Subscriptions";
import {
    TransactionIcon,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { localUid } from "../../../../../../global_state/UserState";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";

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

        const convo = data.convoDismissed;

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

        /*
         * Create transaction for this bad boi
         */
        const transaction: TransactionType = {
            tid: localUid(),
            time: Date.now().toString(),
            coin: 0,
            message: `${convo.tname} dismissed your response: "${convo.lastMsg}"`,
            transactionType: TransactionTypesEnum.Convo,
            transactionIcon: TransactionIcon.Convo,
            data: `${cvid}:${convo.pid}`,
        };

        /*
         * Notify user of new transaction update
         */
        cache.modify({
            id: cache.identify({
                __typename: USER_TYPENAME,
                id: localUid(),
            }),
            fields: {
                newTransactionUpdate() {
                    return true;
                },
            },
        });

        addTransaction(transaction, cache);
    }
}
