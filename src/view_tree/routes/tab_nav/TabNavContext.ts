import * as React from "react";

interface TabNavActions {
    openPost: (pid: string) => void;
}

export const TabNavContext = React.createContext<TabNavActions>({
    openPost: () => {},
});
