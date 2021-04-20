export enum FollowEntityEnum {
    User,
    Community,
}

export interface FollowEntityType {
    sid: string;
    tid: string;
    name: string;
    time: string;
    imgUrl?: string;
    entityType: FollowEntityEnum;
}
