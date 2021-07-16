import React from "react";

interface TabNavActions {
    openPost: (pid: string) => void;
    openConvo: (cvid: string, pid: string) => void;
    openNewMessage: (tname: string, pid: string, responseCost: number) => void;
    openNew: () => void;
    openCommunity: (cmid: string) => void;
    openUser: (uid: string) => void;
    openFollows: (name: string, uid: string) => void;
    openReport: (pid: string) => void;
    openReportUser: (uid: string) => void;
    openSettings: () => void;
    openShop: (screen?: string) => void;
}

export const TabNavContext = React.createContext<TabNavActions>({
    openPost: () => {},
    openConvo: () => {},
    openNewMessage: () => {},
    openNew: () => {},
    openCommunity: () => {},
    openUser: () => {},
    openFollows: () => {},
    openReport: () => {},
    openReportUser: () => {},
    openSettings: () => {},
    openShop: () => {},
});
