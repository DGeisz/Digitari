import * as React from "react";

interface TabNavActions {
    openPost: (pid: string) => void;
    openConvo: (cid: string) => void;
    openNewMessage: (tname: string, pid: string, responseCost: number) => void;
    openNew: () => void;
}

export const TabNavContext = React.createContext<TabNavActions>({
    openPost: () => {},
    openConvo: () => {},
    openNewMessage: () => {},
    openNew: () => {},
});
