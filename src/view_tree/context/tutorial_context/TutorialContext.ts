import { createContext } from "react";

export enum TutorialScreen {
    /*
     * First profile screens
     */
    Welcome,
    ProfileDescription,
    OpenTierPrompt,
    TapTier,
    OpenWalletPrompt,
}

interface TutorialContextType {
    tutorialActive: boolean;
    tutorialScreen: TutorialScreen;
    advanceTutorial: () => void;
    setScreen: (screen: TutorialScreen) => void;
    skipTutorial: () => void;
}

export const TutorialContext = createContext<TutorialContextType>({
    tutorialActive: false,
    tutorialScreen: TutorialScreen.Welcome,
    advanceTutorial: () => {},
    setScreen: () => {},
    skipTutorial: () => {},
});
