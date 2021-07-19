import { OnSubscriptionDataOptions } from "@apollo/client";
import { NewMessageAddedData } from "../../gql/Subscriptions";
import {
    CONVO,
    CONVO_MESSAGES,
    ConvoData,
    ConvoMessagesData,
    ConvoMessagesVariables,
    ConvoVariables,
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

    const uid = localUid();

    if (!!data?.messageAdded) {
        const convoMessagesData = cache.readQuery<
            ConvoMessagesData,
            ConvoMessagesVariables
        >({
            query: CONVO_MESSAGES,
            variables: {
                cvid: data.messageAdded.id,
            },
        });

        const convoData = cache.readQuery<ConvoData, ConvoVariables>({
            query: CONVO,
            variables: {
                cvid: data.messageAdded.id,
            },
        });

        if (!!convoMessagesData?.convoMessages) {
            cache.writeQuery<ConvoMessagesData, ConvoMessagesVariables>({
                query: CONVO_MESSAGES,
                variables: {
                    cvid: data.messageAdded.id,
                },
                data: {
                    convoMessages: [
                        ...convoMessagesData.convoMessages,
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
                targetMsgCount(existing) {
                    if (!!convoData?.convo && uid !== convoData.convo.tid) {
                        return existing + 1;
                    }

                    return existing;
                },
                sourceMsgCount(existing) {
                    if (!!convoData?.convo && uid === convoData.convo.tid) {
                        return existing + 1;
                    }

                    return existing;
                },
            },
        });

        /*
         * Notify user of new transaction update
         */
        cache.modify({
            id: cache.identify({
                __typename: USER_TYPENAME,
                id: uid,
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
