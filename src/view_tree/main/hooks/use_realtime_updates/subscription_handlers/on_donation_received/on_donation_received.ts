import { OnSubscriptionDataOptions } from "@apollo/client";
import { DonationReceivedData } from "../../gql/Subscriptions";
import { POST_TYPENAME } from "../../../../../../global_types/PostTypes";
import {
    TRANSACTION_TYPENAME,
    TransactionIcon,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { localUid } from "../../../../../../global_state/UserState";
import {
    POST,
    PostData,
    PostVariables,
} from "../../../../screens/post_screen/gql/Queries";
import { addTransaction } from "../utils/cache_utils";
import {
    DIGIBOLT_PRICE,
    USER_TYPENAME,
} from "../../../../../../global_types/UserTypes";
import { addNewReceipt } from "../../../../../../global_state/CoinUpdates";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";

export async function onDonationReceived(
    options: OnSubscriptionDataOptions<DonationReceivedData>
) {
    const {
        client: { cache },
        client,
        subscriptionData: { data },
    } = options;

    if (!!data?.donationReceived) {
        const { pid, amount, name, uid } = data.donationReceived;
        const coinTotal = DIGIBOLT_PRICE * amount;

        /*
         * First we add coin to the post
         */
        cache.modify({
            id: cache.identify({
                __typename: POST_TYPENAME,
                pid,
            }),
            fields: {
                coin(existing) {
                    return existing + coinTotal;
                },
            },
        });

        let message = `${name} bought ${toRep(amount)} ${
            amount === 1 ? "digibolt" : "digibolts"
        } from your post`;

        try {
            const { data: postData } = await client.query<
                PostData,
                PostVariables
            >({
                query: POST,
                variables: {
                    pid,
                },
            });

            if (!!postData?.post) {
                message = `${name} bought ${toRep(amount)} ${
                    amount === 1 ? "digibolt" : "digibolts"
                } from your post: "${postData.post.content}"`;
            }
        } catch (e) {}

        /*
         * Now handle the new transaction
         */
        const transaction: TransactionType = {
            tid: localUid(),
            time: Date.now().toString(),
            coin: coinTotal,
            message,
            transactionType: TransactionTypesEnum.User,
            transactionIcon: TransactionIcon.Like,
            data: uid,
            __typename: TRANSACTION_TYPENAME,
        };

        /*
         * Add receipt for animation
         */
        addNewReceipt(coinTotal);

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
                receivedFromConvos(existing) {
                    existing = parseInt(existing);

                    return (existing + coinTotal).toString();
                },
                transTotal(existing) {
                    existing = parseInt(existing);

                    return (existing + coinTotal).toString();
                },
            },
        });

        addTransaction(transaction, cache);
    }
}
