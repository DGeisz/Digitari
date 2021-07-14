import React from "react";

interface LastPostsFetch {
    lastPostsFetchTime: number;
    setLastPostsFetchTime: (time: number) => void;
}

export const LastPostsFetchContext = React.createContext<LastPostsFetch>({
    lastPostsFetchTime: 0,
    setLastPostsFetchTime: () => {},
});
