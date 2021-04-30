export enum PushNotificationType {
    Message,
    NewConvo,
    ConvoDismissed,
    ConvoBlocked,
    ConvoFinished,
    UserFollowed,
    UserFollowedCommunity,
}

export interface NotificationData {
    type: PushNotificationType;
    content: string;
}

export interface UserToken {
    uid: string;
    token: string;
    backOffTime: number;
    backOffInterval: number;
}

export interface PushTicket {
    id: string;
    time: number;
    ttl: number;
    ticket: string;
}
