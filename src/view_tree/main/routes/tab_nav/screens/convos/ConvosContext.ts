import React from "react";

interface ConvosActions {
    setActiveConvosViewed: (active: boolean) => void;
}

export const ConvosContext = React.createContext<ConvosActions>({
    setActiveConvosViewed: () => {},
});
