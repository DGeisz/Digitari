import React from "react";
import { UserType } from "../../../global_types/UserTypes";

interface UserContextType {
    uid: string;
    openPost: (pid: string) => void;
    openNewMessage: (tname: string, pid: string, responseCost: number) => void;
    openCommunity: (cmid: string) => void;
    openUser: (uid: string) => void;
    refreshHeader: () => void;
    openReport: (pid: string) => void;
    openConvo: (cvid: string, pid: string) => void;
    openFollows: () => void;
    user?: UserType;
    isProfile: boolean;
}

export const UserContext = React.createContext<UserContextType>({
    uid: "",
    isProfile: false,
    openPost: () => {},
    openNewMessage: () => {},
    openCommunity: () => {},
    openUser: () => {},
    refreshHeader: () => {},
    openReport: () => {},
    openConvo: () => {},
    openFollows: () => {},
});
