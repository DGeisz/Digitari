import { OnSubscriptionDataOptions } from "@apollo/client";
import { ConvoFinishedData } from "../../gql/Subscriptions";
import {
    CONVO_TYPENAME,
    ConvoStatus,
} from "../../../../../../global_types/ConvoTypes";
import { addTransaction, sort_active_convos } from "../utils/cache_utils";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { localUid } from "../../../../../../global_state/UserState";
import {
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { addNewReceipt } from "../../../../../../global_state/CoinUpdates";
import { challengeCheck } from "../../../../../../global_gql/challenge_check/challenge_check";

export function onConvoFinished(
    options: OnSubscriptionDataOptions<ConvoFinishedData>
) {
    const {
        client: { cache },
        subscriptionData: { data },
    } = options;

    if (!!data?.convoFinished) {
        const {
            convoFinished: {
                convo: { id: cvid },
                convo,
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
                    return ConvoStatus.Finished;
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
         * Increase user's successful convos,
         * and increase ranking as well
         */
        cache.modify({
            id: cache.identify({
                __typename: USER_TYPENAME,
                id: localUid(),
            }),
            fields: {
                successfulConvos(existing) {
                    return existing + 1;
                },
                ranking(existing) {
                    return existing + 1;
                },
            },
        });

        const uid = localUid();

        /*
         * First be sure we're the source of
         * the convo
         */
        if (uid !== convo.tid) {
            /*
             * Now that we've established we're the source
             * we add a transaction accordingly
             */
            const transaction: TransactionType = {
                tid: uid,
                time: Date.now().toString(),
                coin: convo.convoReward,
                message: `Reward for your successful convo with ${convo.tname}`,
                transactionType: TransactionTypesEnum.Convo,
                data: `${cvid}:${convo.pid}`,
            };

            /*
             * Add receipt for animation
             */
            addNewReceipt(convo.convoReward);

            /*
             * Notify user of new transaction update
             */
            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    newTransactionUpdate() {
                        return true;
                    },
                    transTotal(existing) {
                        return existing + convo.convoReward;
                    },
                },
            });

            addTransaction(transaction, cache);
        }

        /*
         * Quick challenge check
         */
        challengeCheck(cache);
    }
}
