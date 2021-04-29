import { OnSubscriptionDataOptions } from "@apollo/client";
import { ConvoCreatedData } from "../../gql/Subscriptions";
import {
    NEW_CONVOS,
    NewConvosData,
    NewConvosVariables,
} from "../../../../routes/tab_nav/screens/convos/sub_screens/new_convos/gql/Queries";
import { ConvoOrder } from "../../../../../../global_types/ConvoTypes";

export function onConvoCreated(
    options: OnSubscriptionDataOptions<ConvoCreatedData>
) {
    console.log("Well, it fired", options.subscriptionData.data);
    const {
        client: { cache },
        subscriptionData: { data },
    } = options;

    if (!!data?.convoCreated) {
        /*
         * Basically, we just want to chuck
         * this convo into the user's new convos.
         *
         * Start out by chucking this into the user's
         * tier sorted new convos
         */
        const tierNewConvos = cache.readQuery<
            NewConvosData,
            NewConvosVariables
        >({
            query: NEW_CONVOS,
            variables: {
                orderingType: ConvoOrder.ranking,
            },
        });

        if (!!tierNewConvos?.newConvos) {
            const convos = [data.convoCreated, ...tierNewConvos.newConvos];

            convos.sort((a, b) => b.sranking - a.sranking);

            cache.writeQuery<NewConvosData, NewConvosVariables>({
                query: NEW_CONVOS,
                variables: {
                    orderingType: ConvoOrder.ranking,
                },
                data: {
                    newConvos: convos,
                },
            });
        }

        /*
         * Now then, we want to also slap this into
         * the user's time organized convos, so basically do
         * a query, and then thread this new convo into the mix
         */
        const timeNewConvos = cache.readQuery<
            NewConvosData,
            NewConvosVariables
        >({
            query: NEW_CONVOS,
            variables: {
                orderingType: ConvoOrder.time,
            },
        });

        if (!!timeNewConvos?.newConvos) {
            cache.writeQuery<NewConvosData, NewConvosVariables>({
                query: NEW_CONVOS,
                variables: {
                    orderingType: ConvoOrder.time,
                },
                data: {
                    newConvos: [data.convoCreated, ...timeNewConvos.newConvos],
                },
            });
        }
    }
}