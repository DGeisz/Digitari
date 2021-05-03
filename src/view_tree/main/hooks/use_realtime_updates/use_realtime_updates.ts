import { useSubscription } from "@apollo/client";
import { localHid, localUid } from "../../../../global_state/UserState";
import {
    CONVO_ACTIVATED,
    CONVO_BLOCKED,
    CONVO_CREATED,
    CONVO_DISMISSED,
    CONVO_FINISHED,
    ConvoActivatedData,
    ConvoActivatedVariables,
    ConvoBlockedData,
    ConvoBlockedVariables,
    ConvoCreatedData,
    ConvoCreatedVariables,
    ConvoDismissedData,
    ConvoDismissedVariables,
    ConvoFinishedData,
    ConvoFinishedVariables,
    DONATION_RECEIVED,
    DonationReceivedData,
    DonationReceivedVariables,
    NEW_COMMUNITY_FOLLOWER,
    NEW_FOLLOWER,
    NEW_MESSAGE_ADDED,
    NewCommunityFollowerData,
    NewCommunityFollowerVariables,
    NewFollowerData,
    NewFollowerVariables,
    NewMessageAddedData,
    NewMessageAddedVariables,
} from "./gql/Subscriptions";
import { onMessageData } from "./subscription_handlers/on_message/on_message_data";
import { onConvoDismissedData } from "./subscription_handlers/on_convo_dismissed/on_convo_dismissed";
import { onConvoBlocked } from "./subscription_handlers/on_convo_blocked/on_convo_blocked";
import { onConvoActivated } from "./subscription_handlers/on_convo_activated/on_convo_activated";
import { onConvoFinished } from "./subscription_handlers/on_convo_finished/on_convo_finished";
import { onConvoCreated } from "./subscription_handlers/on_convo_created/on_convo_created";
import { onNewFollower } from "./subscription_handlers/on_new_follower/on_new_follower";
import { onNewCommunityFollower } from "./subscription_handlers/on_new_community_follower/on_new_community_follower";
import { onDonationReceived } from "./subscription_handlers/on_donation_received/on_donation_received";

export function useRealtimeUpdates() {
    const uid = localUid();
    const hid = localHid();

    /*
     * Subs for receiving a new message
     */
    useSubscription<NewMessageAddedData, NewMessageAddedVariables>(
        NEW_MESSAGE_ADDED,
        {
            variables: {
                tid: uid,
            },
            onSubscriptionData: onMessageData,
        }
    );

    useSubscription<NewMessageAddedData, NewMessageAddedVariables>(
        NEW_MESSAGE_ADDED,
        {
            variables: {
                tid: hid,
            },
            onSubscriptionData: onMessageData,
        }
    );

    /*
     * Subs for handling dismissed convos
     */
    useSubscription<ConvoDismissedData, ConvoDismissedVariables>(
        CONVO_DISMISSED,
        {
            variables: {
                sid: uid,
            },
            onSubscriptionData: onConvoDismissedData,
        }
    );

    useSubscription<ConvoDismissedData, ConvoDismissedVariables>(
        CONVO_DISMISSED,
        {
            variables: {
                sid: hid,
            },
            onSubscriptionData: onConvoDismissedData,
        }
    );

    /*
     * Subs for handling blocked convos
     */
    useSubscription<ConvoBlockedData, ConvoBlockedVariables>(CONVO_BLOCKED, {
        variables: {
            tid: uid,
        },
        onSubscriptionData: onConvoBlocked,
    });

    useSubscription<ConvoBlockedData, ConvoBlockedVariables>(CONVO_BLOCKED, {
        variables: {
            tid: hid,
        },
        onSubscriptionData: onConvoBlocked,
    });

    /*
     * Handle convo activated
     */
    useSubscription<ConvoActivatedData, ConvoActivatedVariables>(
        CONVO_ACTIVATED,
        {
            variables: {
                sid: uid,
            },
            onSubscriptionData: onConvoActivated,
        }
    );

    useSubscription<ConvoActivatedData, ConvoActivatedVariables>(
        CONVO_ACTIVATED,
        {
            variables: {
                sid: hid,
            },
            onSubscriptionData: onConvoActivated,
        }
    );

    /*
     * Handle convo finished
     */
    useSubscription<ConvoFinishedData, ConvoFinishedVariables>(CONVO_FINISHED, {
        variables: {
            tid: uid,
        },
        onSubscriptionData: onConvoFinished,
    });

    useSubscription<ConvoFinishedData, ConvoFinishedVariables>(CONVO_FINISHED, {
        variables: {
            tid: hid,
        },
        onSubscriptionData: onConvoFinished,
    });

    /*
     * New convo
     */
    useSubscription<ConvoCreatedData, ConvoCreatedVariables>(CONVO_CREATED, {
        variables: {
            tid: uid,
        },
        onSubscriptionData: onConvoCreated,
    });

    /*
     * New follower
     */
    useSubscription<NewFollowerData, NewFollowerVariables>(NEW_FOLLOWER, {
        variables: {
            tid: uid,
        },
        onSubscriptionData: onNewFollower,
    });

    /*
     * New community follower
     */
    useSubscription<NewCommunityFollowerData, NewCommunityFollowerVariables>(
        NEW_COMMUNITY_FOLLOWER,
        {
            variables: {
                tuid: uid,
            },
            onSubscriptionData: onNewCommunityFollower,
        }
    );

    /*
     * Donation received
     */
    useSubscription<DonationReceivedData, DonationReceivedVariables>(
        DONATION_RECEIVED,
        {
            variables: {
                tuid: uid,
            },
            onSubscriptionData: onDonationReceived,
        }
    );
}
