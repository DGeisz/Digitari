import { OnSubscriptionDataOptions } from "@apollo/client";
import { NewMessageAddedData } from "../../gql/Subscriptions";
import {
    CONVO_MESSAGES,
    ConvoMessagesData,
    ConvoMessagesVariables,
} from "../../../../screens/convo/gql/Queries";
import { CONVO_TYPENAME } from "../../../../../../global_types/ConvoTypes";
import { sort_active_convos } from "../utils/cache_utils";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { localUid } from "../../../../../../global_state/UserState";

export function onMessageData(
    options: OnSubscriptionDataOptions<NewMessageAddedData>
) {
    const {
        client: { cache },
        subscriptionData: { data },
    } = options;

    if (!!data?.messageAdded) {
        const convoData = cache.readQuery<
            ConvoMessagesData,
            ConvoMessagesVariables
        >({
            query: CONVO_MESSAGES,
            variables: {
                cvid: data.messageAdded.id,
            },
        });

        if (!!convoData?.convoMessages) {
            cache.writeQuery<ConvoMessagesData, ConvoMessagesVariables>({
                query: CONVO_MESSAGES,
                variables: {
                    cvid: data.messageAdded.id,
                },
                data: {
                    convoMessages: [
                        ...convoData.convoMessages,
                        data.messageAdded,
                    ],
                },
            });
        }
        /*
         * Modify the convo
         */
        cache.modify({
            id: cache.identify({
                __typename: CONVO_TYPENAME,
                id: data.messageAdded.id,
            }),
            fields: {
                lastMsg() {
                    return data.messageAdded.content;
                },
                lastTime() {
                    return Date.now().toString();
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
         * Notify user of new transaction update
         */
        cache.modify({
            id: cache.identify({
                __typename: USER_TYPENAME,
                id: localUid(),
            }),
            fields: {
                newConvoUpdate() {
                    return true;
                },
            },
        });

        /*
         * Reorganize the active convos
         */
        sort_active_convos(cache);
    }
}
