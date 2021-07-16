import { OnSubscriptionDataOptions } from "@apollo/client";
import { NewCommunityFollowerData } from "../../gql/Subscriptions";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { addTransaction } from "../utils/cache_utils";
import { localUid } from "../../../../../../global_state/UserState";
import {
    GET_COMMUNITY,
    GetCommunityQueryData,
    GetCommunityQueryVariables,
} from "../../../../screens/community/gql/Queries";
import { FOLLOW_COMMUNITY_PRICE } from "../../../../../../global_types/CommunityTypes";
import { addNewReceipt } from "../../../../../../global_state/CoinUpdates";

export async function onNewCommunityFollower(
    options: OnSubscriptionDataOptions<NewCommunityFollowerData>
) {
    const {
        client: { cache },
        client,
        subscriptionData: { data },
    } = options;

    if (!!data?.newCommunityFollower) {
        const follower = data.newCommunityFollower;
        const uid = localUid();

        /*
         * If I am the follower, then
         * the next time I go to my transactions,
         * this transaction will appear there,
         * so we don't need to do any special cache
         * manipulations or creations, thus return early
         */
        if (uid === follower.sid) {
            return;
        }

        let message = `${follower.name} followed your community!`;

        try {
            const { data: comData } = await client.query<
                GetCommunityQueryData,
                GetCommunityQueryVariables
            >({
                query: GET_COMMUNITY,
                variables: {
                    cmid: follower.tid,
                },
            });

            if (!!comData?.community) {
                message = `${follower.name} followed your community: "${comData.community.name}"`;
            }
        } catch (e) {}

        /*
         * Add transaction
         */
        const newTransaction: TransactionType = {
            tid: uid,
            time: Date.now().toString(),
            coin: FOLLOW_COMMUNITY_PRICE,
            message: message,
            transactionType: TransactionTypesEnum.User,
            data: follower.sid,
            __typename: TRANSACTION_TYPENAME,
        };

        /*
         * Add receipt for animation
         */
        addNewReceipt(FOLLOW_COMMUNITY_PRICE);

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
                    existing = parseInt(existing);

                    return (existing + FOLLOW_COMMUNITY_PRICE).toString();
                },
            },
        });

        addTransaction(newTransaction, cache);
    }
}
