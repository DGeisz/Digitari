import * as React from "react";

interface TabNavActions {
    openPost: (pid: string) => void;
    openConvo: (cid: string) => void;
}

export const TabNavContext = React.createContext<TabNavActions>({
    openPost: () => {},
    openConvo: () => {},
});
