import { OnSubscriptionDataOptions } from "@apollo/client";
import { DonationReceivedData } from "../../gql/Subscriptions";
import { POST_TYPENAME } from "../../../../../../global_types/PostTypes";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { localUid } from "../../../../../../global_state/UserState";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";
import {
    POST,
    PostData,
    PostVariables,
} from "../../../../screens/post_screen/gql/Queries";
import { addTransaction } from "../utils/cache_utils";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { addNewReceipt } from "../../../../../../global_state/CoinUpdates";
import { challengeCheck } from "../../../../../../global_gql/challenge_check/challenge_check";

export async function onDonationReceived(
    options: OnSubscriptionDataOptions<DonationReceivedData>
) {
    const {
        client: { cache },
        client,
        subscriptionData: { data },
    } = options;

    console.log("Donation received", data);

    if (!!data?.donationReceived) {
        const { pid, amount, name, uid } = data.donationReceived;

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
                    return existing + amount;
                },
            },
        });

        let message = `${name} liked your post`;

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
                message = `${name} liked your post: "${postData.post.content}"`;
            }
        } catch (e) {}

        /*
         * Now handle the new transaction
         */
        const transaction: TransactionType = {
            tid: localUid(),
            time: Date.now().toString(),
            coin: amount,
            message,
            transactionType: TransactionTypesEnum.User,
            data: uid,
            __typename: TRANSACTION_TYPENAME,
        };

        /*
         * Add receipt for animation
         */
        addNewReceipt(amount);

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
                    return existing + amount;
                },
                transTotal(existing) {
                    return existing + amount;
                },
            },
        });

        addTransaction(transaction, cache);

        challengeCheck(cache);
    }
}
