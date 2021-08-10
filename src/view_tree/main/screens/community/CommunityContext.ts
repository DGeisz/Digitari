import React from "react";
import { CommunityNavProp } from "../../MainEntryNavTypes";

interface CommunityContextType {
    cmid: string;
    navigation: CommunityNavProp;
    refreshHeader: () => void;
    tid: string;
    onSelectUser: (uid: string) => void;
}

//@ts-ignore
export const CommunityContext = React.createContext<CommunityContextType>({});
