import { OnSubscriptionDataOptions } from "@apollo/client";
import { NewFollowerData } from "../../gql/Subscriptions";
import {
    TRANSACTION_TYPENAME,
    TransactionIcon,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { addTransaction } from "../utils/cache_utils";
import { localUid } from "../../../../../../global_state/UserState";
import {
    FOLLOW_USER_PRICE,
    USER_TYPENAME,
} from "../../../../../../global_types/UserTypes";
import { addNewReceipt } from "../../../../../../global_state/CoinUpdates";

export function onNewFollower(
    options: OnSubscriptionDataOptions<NewFollowerData>
) {
    const {
        client: { cache },
        subscriptionData: { data },
    } = options;

    if (!!data?.newFollower) {
        const follower = data.newFollower;
        const uid = localUid();

        /*
         * Update follower count, and flag
         * the new transaction update flag
         */
        cache.modify({
            id: cache.identify({
                __typename: USER_TYPENAME,
                id: uid,
            }),
            fields: {
                followers(existing) {
                    return existing + 1;
                },
                newTransactionUpdate() {
                    return true;
                },
                transTotal(existing) {
                    existing = parseInt(existing);

                    return (existing + FOLLOW_USER_PRICE).toString();
                },
            },
        });

        /*
         * Add transaction
         */
        const newTransaction: TransactionType = {
            tid: uid,
            time: Date.now().toString(),
            coin: FOLLOW_USER_PRICE,
            message: `${follower.name} followed you!`,
            transactionType: TransactionTypesEnum.User,
            transactionIcon: TransactionIcon.User,
            data: follower.sid,
            __typename: TRANSACTION_TYPENAME,
        };

        /*
         * Add receipt for animation
         */
        addNewReceipt(FOLLOW_USER_PRICE);

        addTransaction(newTransaction, cache);
    }
}
