import { OnSubscriptionDataOptions } from "@apollo/client";
import { NewCommunityFollowerData } from "../../gql/Subscriptions";
import {
    TRANSACTION_TYPENAME,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import { FOLLOW_USER_PRICE } from "../../../../../../global_types/UserTypes";
import { addTransaction } from "../utils/cache_utils";
import { localUid } from "../../../../../../global_state/UserState";
import {
    GET_COMMUNITY,
    GetCommunityQueryData,
    GetCommunityQueryVariables,
} from "../../../../screens/community/gql/Queries";
import { FOLLOW_COMMUNITY_PRICE } from "../../../../../../global_types/CommunityTypes";

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

            if (!!comData.community) {
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

        addTransaction(newTransaction, cache);
    }
}
